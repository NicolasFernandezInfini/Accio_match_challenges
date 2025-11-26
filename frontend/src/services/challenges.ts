/**
 * Challenges API Service
 */
import apiClient from './api'

export interface Challenge {
  id: number
  title: string
  description: string
  requirements?: string
  topic?: string
  type: 'permanent' | 'event_based'
  status: 'draft' | 'active' | 'matching' | 'completed' | 'archived'
  language: 'es' | 'en' | 'ca'
  required_capabilities: string[]
  sector_target: string[]
  location_preference?: string
  size_preference: string[]
  num_matches: number
  created_by?: number
  created_at: string
  updated_at: string
}

export const challengesAPI = {
  // Get all challenges
  getAll: async (params?: { status?: string; type?: string; search?: string }) => {
    const response = await apiClient.get<Challenge[]>('/challenges/', { params })
    return response.data
  },

  // Get single challenge
  getById: async (id: number) => {
    const response = await apiClient.get<Challenge>(`/challenges/${id}/`)
    return response.data
  },

  // Create challenge
  create: async (data: Partial<Challenge>) => {
    const response = await apiClient.post<Challenge>('/challenges/', data)
    return response.data
  },

  // Update challenge
  update: async (id: number, data: Partial<Challenge>) => {
    const response = await apiClient.patch<Challenge>(`/challenges/${id}/`, data)
    return response.data
  },

  // Delete challenge
  delete: async (id: number) => {
    await apiClient.delete(`/challenges/${id}/`)
  },

  // Execute matching
  executeMatching: async (id: number) => {
    const response = await apiClient.post(`/challenges/${id}/execute_matching/`)
    return response.data
  },

  // Get results
  getResults: async (id: number) => {
    const response = await apiClient.get(`/challenges/${id}/results/`)
    return response.data
  },
}

export default challengesAPI
