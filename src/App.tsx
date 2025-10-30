/**
 * Composant principal de l'application ActuPolitik
 */

import { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm';
import SummaryDisplay from './components/SummaryDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { getSummary, checkHealth } from './services/api';
import type { SummaryResponse } from './types';
import './styles/global.css';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [summaryData, setSummaryData] = useState<SummaryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState<boolean>(true);

  // Vérifier la connexion au backend au démarrage
  useEffect(() => {
    const checkBackend = async (): Promise<void> => {
      const isHealthy = await checkHealth();
      setBackendStatus(isHealthy);
      
      if (!isHealthy) {
        setError('❌ Backend non accessible. Vérifiez que le serveur FastAPI tourne sur http://localhost:8000');
      }
    };
    
    checkBackend();
  }, []);

  const handleSearch = async (name: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    setSummaryData(null);

    const result = await getSummary(name);

    setIsLoading(false);

    if (result.success && result.data) {
      setSummaryData(result.data);
    } else {
      setError(result.error || 'Une erreur est survenue');
    }
  };

  const handleReset = (): void => {
    setSummaryData(null);
    setError(null);
  };

  return (
    <div className="app">
      <div className="container">
        {!isLoading && !summaryData && !error && (
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        )}

        {isLoading && <LoadingSpinner />}

        {(summaryData || error) && (
          <SummaryDisplay
            data={summaryData}
            error={error}
            onReset={handleReset}
          />
        )}

        {!backendStatus && !isLoading && (
          <div className="backend-warning">
            ⚠️ Le backend ne répond pas. Lancez : <code>uvicorn app.main:app --reload --port 8000</code>
          </div>
        )}
      </div>

      <footer className="footer">
        <p>
          <strong>ActuPolitik</strong>Propulsé par <strong>FastAPI</strong> × <strong>React</strong> × <strong>TypeScript</strong> × <strong>OpenRouter</strong>
        </p>
      </footer>
    </div>
  );
}

export default App;
