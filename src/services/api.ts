/**
 * Service pour communiquer avec le backend FastAPI
 * Typé avec TypeScript pour la sécurité
 */

import axios, { AxiosError } from 'axios';
import type { SummaryResponse, HealthResponse, ApiResult, ApiError } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL ;

/**
 * Appelle l'API pour générer un résumé d'actualité
 */
export const getSummary = async (name: string): Promise<ApiResult<SummaryResponse>> => {
  try {
    const response = await axios.post<SummaryResponse>(`${API_BASE_URL}/api/summary`, {
      name: name.trim()
    });
    
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      
      if (axiosError.response) {
        // Le serveur a répondu avec un code d'erreur
        return {
          success: false,
          error: axiosError.response.data.detail || 'Une erreur est survenue'
        };
      } else if (axiosError.request) {
        // La requête a été faite mais pas de réponse
        return {
          success: false,
          error: 'Impossible de contacter le serveur. Vérifiez que le backend est lancé.'
        };
      }
    }
    
    // Autre erreur
    return {
      success: false,
      error: 'Une erreur inattendue est survenue'
    };
  }
};

/**
 * Vérifie si le backend est accessible
 */
export const checkHealth = async (): Promise<boolean> => {
  try {
    const response = await axios.get<HealthResponse>(`${API_BASE_URL}/health`);
    return response.data.status === 'healthy';
  } catch (error) {
    return false;
  }
};