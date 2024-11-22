/**
 * API service for handling communication with the backend
 */
import axios, { AxiosError } from 'axios';
import { PRDData } from '../types/prd';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Custom error class for API errors
 */
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

/**
 * Handle API errors consistently
 */
const handleAPIError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ detail: string }>;
    throw new APIError(
      axiosError.response?.data?.detail || 'An unexpected error occurred',
      axiosError.response?.status,
      axiosError.response?.data
    );
  }
  throw new APIError('An unexpected error occurred');
};

/**
 * Service class for handling PRD-related API calls
 */
export class PRDService {
  /**
   * Create a new PRD
   * @param data PRD data to be created
   * @returns Created PRD data
   */
  static async createPRD(data: PRDData): Promise<PRDData> {
    try {
      const response = await api.post<PRDData>('/prd/', data);
      return response.data;
    } catch (error) {
      console.error('Error creating PRD:', error);
      throw handleAPIError(error);
    }
  }

  /**
   * Get PRD by project name
   * @param projectName Name of the project
   * @returns PRD data
   */
  static async getPRD(projectName: string): Promise<PRDData> {
    try {
      const response = await api.get<PRDData>(`/prd/${projectName}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching PRD:', error);
      throw handleAPIError(error);
    }
  }

  /**
   * Update existing PRD
   * @param projectName Name of the project
   * @param data Updated PRD data
   * @returns Updated PRD data
   */
  static async updatePRD(projectName: string, data: PRDData): Promise<PRDData> {
    try {
      const response = await api.put<PRDData>(`/prd/${projectName}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating PRD:', error);
      throw handleAPIError(error);
    }
  }

  /**
   * Delete PRD
   * @param projectName Name of the project to delete
   * @returns Success message
   */
  static async deletePRD(projectName: string): Promise<{ status: string; message: string }> {
    try {
      const response = await api.delete(`/prd/${projectName}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting PRD:', error);
      throw handleAPIError(error);
    }
  }

  /**
   * Export PRD data
   * @param projectName Name of the project to export
   * @returns Exported PRD data
   */
  static async exportPRD(projectName: string): Promise<PRDData & { exported_at: string }> {
    try {
      const response = await api.get(`/prd/${projectName}/export`);
      return response.data;
    } catch (error) {
      console.error('Error exporting PRD:', error);
      throw handleAPIError(error);
    }
  }

  /**
   * Check if a project name is available
   * @param projectName Name of the project to check
   * @returns Boolean indicating if the name is available
   */
  static async checkProjectNameAvailability(projectName: string): Promise<boolean> {
    try {
      await api.get(`/prd/${projectName}`);
      return false; // Project exists
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return true; // Project name is available
      }
      throw handleAPIError(error);
    }
  }
}

// Add response interceptor for common error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error
      throw new APIError('Network error - please check your connection');
    }
    if (error.response.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access');
    }
    if (error.response.status === 403) {
      // Handle forbidden access
      console.error('Forbidden access');
    }
    throw error;
  }
);

export default api;
