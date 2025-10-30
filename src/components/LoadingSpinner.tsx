/**
 * Composant spinner de chargement
 */

import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">
        Analyse en cours...
      </p>
      <p className="loading-subtext">
        Vérification politique • Recherche d'actualités • Génération du résumé
      </p>
    </div>
  );
};

export default LoadingSpinner;