"""
Generate theme clusters and key phrases from responses.csv.
Outputs public/data/analysis.json for the React site.

Usage: python3 analysis/run_analysis.py
"""
import json, re, os
import pandas as pd
import numpy as np
import nltk

nltk.download('stopwords', quiet=True)
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity

BASE_STOPS = set(stopwords.words('english'))
DOMAIN_STOPS = {
    'loomis', 'chaffee', 'ai', 'school', 'schools', 'students', 'student', 'teacher',
    'teachers', 'use', 'using', 'used', 'uses', 'also', 'would', 'could',
    'should', 'need', 'needs', 'make', 'think', 'know', 'like', 'get',
    'one', 'way', 'time', 'people', 'thing', 'things', 'lc', 'class',
    'work', 'working', 'stop', 'start', 'continue', 'making', 'ways',
    'many', 'something', 'completely', 'trying', 'giving', 'going',
    'allow', 'allowing', 'allowed', 'talking', 'letting', 'keep', 'keeping',
    'talk', 'say', 'saying', 'help', 'helping', 'us', 'them', 'well',
}
STOP_WORDS = BASE_STOPS | DOMAIN_STOPS


def clean(text):
    text = text.lower()
    text = re.sub(r'[^\w\s]', ' ', text)
    return re.sub(r'\s+', ' ', text).strip()


def top_phrases(responses, n=25):
    cleaned = [clean(r) for r in responses]
    vec = TfidfVectorizer(
        stop_words=list(STOP_WORDS),
        ngram_range=(1, 2),
        min_df=3,
        max_df=0.80,
        max_features=600,
    )
    try:
        mat = vec.fit_transform(cleaned)
    except ValueError:
        return []
    terms = vec.get_feature_names_out()
    scores = np.asarray(mat.sum(axis=0)).flatten()
    top = scores.argsort()[::-1][:n]
    return [{'phrase': terms[i], 'score': round(float(scores[i]), 2)} for i in top]


def cluster_responses(responses, n_clusters=9):
    n_clusters = min(n_clusters, max(2, len(responses) // 30))
    cleaned = [clean(r) for r in responses]
    vec = TfidfVectorizer(
        stop_words=list(STOP_WORDS),
        max_features=400,
        min_df=2,
        max_df=0.85,
    )
    try:
        mat = vec.fit_transform(cleaned)
    except ValueError:
        return []
    km = KMeans(n_clusters=n_clusters, random_state=42, n_init=15)
    labels = km.fit_predict(mat)
    terms = vec.get_feature_names_out()

    clusters = []
    for i in range(n_clusters):
        mask = labels == i
        center = km.cluster_centers_[i]
        top_idx = center.argsort()[::-1][:6]
        top_terms = [terms[j] for j in top_idx]

        clust_responses = [responses[j] for j in range(len(responses)) if mask[j]]
        clust_mat = mat[mask]
        sims = cosine_similarity(clust_mat, center.reshape(1, -1)).flatten()
        sample_idx = sims.argsort()[::-1][:3]
        samples = [clust_responses[j] for j in sample_idx]

        # Build a readable label: title-case the top 2 terms
        label_terms = [t for t in top_terms[:3] if len(t) > 3][:2]
        label = ' · '.join(t.replace('_', ' ').title() for t in label_terms) or top_terms[0].title()

        clusters.append({
            'id': i,
            'label': label,
            'terms': top_terms,
            'count': int(mask.sum()),
            'samples': samples,
        })

    clusters.sort(key=lambda x: x['count'], reverse=True)
    return clusters


def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(script_dir)

    df = pd.read_csv(os.path.join(repo_root, 'responses.csv'))
    df['category'] = df['category'].str.upper().str.strip()
    df['response'] = df['response'].fillna('').str.strip()
    df = df[df['response'] != '']

    results = {}
    for cat in ['STOP', 'START', 'CONTINUE']:
        rows = df[df['category'] == cat]['response'].tolist()
        print(f'{cat}: {len(rows)} responses …', flush=True)
        clusters = cluster_responses(rows)
        phrases = top_phrases(rows)
        results[cat] = {'count': len(rows), 'clusters': clusters, 'phrases': phrases}
        print(f'  → {len(clusters)} clusters, {len(phrases)} phrases', flush=True)

    out_path = os.path.join(repo_root, 'public', 'data', 'analysis.json')
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, 'w') as f:
        json.dump(results, f, indent=2)
    print(f'\nSaved → {out_path}')


if __name__ == '__main__':
    main()
