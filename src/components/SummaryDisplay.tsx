/**
 * Composant d'affichage du résumé d'actualité
 */

import React from 'react';
import type { SummaryResponse } from '../types';
import './SummaryDisplay.css';

interface SummaryDisplayProps {
  data: SummaryResponse | null;
  error: string | null;
  onReset: () => void;
}

const SummaryDisplay: React.FC<SummaryDisplayProps> = ({ data, error, onReset }) => {
  if (error) {
    return (
      <div className="result-container error">
        <div className="error-icon">❌</div>
        <h2 className="error-title">Erreur</h2>
        <p className="error-message">{error}</p>
        <button onClick={onReset} className="reset-button">
          ← Nouvelle recherche
        </button>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  const { summary, sources, date, articles_count } = data;

  return (
    <div className="result-container success">
      <button onClick={onReset} className="reset-button-top">
        ← Nouvelle recherche
      </button>

      <div className="summary-header">
        <h2 className="summary-title">📋 Résumé du {formatDate(date)}</h2>
        <span className="articles-badge">
          {articles_count} article{articles_count > 1 ? 's' : ''} analysé{articles_count > 1 ? 's' : ''}
        </span>
      </div>

      <div className="summary-content">
        <p className="summary-text">{summary}</p>
      </div>

      {sources && sources.length > 0 && (
        <div className="sources-section">
          <h3 className="sources-title">🔗 Sources</h3>
          <ul className="sources-list">
            {sources.map((source, index) => (
              <li key={index} className="source-item">
                <a
                  href={source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="source-link"
>
                  {extractDomain(source)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Utilitaires
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const extractDomain = (url: string): string => {
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch {
    return url;
  }
};

export default SummaryDisplay;