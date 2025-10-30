/**
 * Types TypeScript pour l'application ActuPolitik
 * Correspond aux schémas Pydantic du backend
 */

// Requête vers l'API
export interface SummaryRequest {
  name: string;
}

// Réponse de l'API
export interface SummaryResponse {
  summary: string;
  sources: string[];
  date: string;
  articles_count: number;
}

// Article de presse
export interface NewsArticle {
  title: string;
  description?: string;
  url: string;
  source: string;
  published_at: string;
}

// Réponse Health Check
export interface HealthResponse {
  status: string;
  timestamp: string;
  version: string;
}

// Erreur API
export interface ApiError {
  detail: string;
}

// Résultat générique
export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}