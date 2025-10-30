import React, { useState } from 'react';
import './SearchForm.css';

interface SearchFormProps {
  onSearch: (name: string) => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) {
      onSearch(name);
    }
  };

  const examples: string[] = [
    'Emmanuel Macron',
    'Marine Le Pen',
    'Jordan Bardella',
    'Jean-Luc Mélenchon'
  ];

  const handleExampleClick = (exampleName: string): void => {
    setName(exampleName);
    onSearch(exampleName);
  };

  return (
    <div className="search-form-container">
      {/* Image hero en haut */}
      <div className="hero-banner">
        <img 
          src="/images/ActuPolitik_banner_1920.png" 
          alt="ActuPolitik - Arc de Triomphe" 
          className="hero-image"
        />
      </div>

      <div className="form-content">
        <div className="header">
          <p className="subtitle">
            Résumés d'actualité politique quotidienne
          </p>
        </div>

        <form onSubmit={handleSubmit} className="search-form">
          <div className="input-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Entrez un nom (ex: Emmanuel Macron)"
              className="search-input"
              disabled={isLoading}
              autoFocus
            />
            <button
              type="submit"
              className="search-button"
              disabled={isLoading || !name.trim()}
            >
              {isLoading ? '⏳' : '🔍'} Rechercher
            </button>
          </div>
        </form>

        <div className="examples">
          <span className="examples-label">Exemples :</span>
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => handleExampleClick(example)}
              className="example-button"
              disabled={isLoading}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchForm;