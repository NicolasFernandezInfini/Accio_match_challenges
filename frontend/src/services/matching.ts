/**
 * Matching API Service
 */
import apiClient from './api'

export interface Match {
  id: number
  result: number
  company: number
  company_details: any
  rank: number
  overall_score: number
  score_technical_relevance: number
  score_sector_experience: number
  score_track_record: number
  explanation: string
  highlights: string[]
  confidence_level: 'low' | 'medium' | 'high'
  decision_log: any
  created_at: string
}

export interface MatchingResult {
  id: number
  challenge: number
  challenge_title: string
  total_companies_analyzed: number
  execution_time_seconds: number
  config_snapshot: any
  status: 'pending' | 'processing' | 'completed' | 'failed'
  error_message?: string
  created_by?: number
  created_at: string
  completed_at?: string
  matches: Match[]
}

export const matchingAPI = {
  // Get all matching results
  getAll: async (params?: { challenge?: number; status?: string }) => {
    const response = await apiClient.get<MatchingResult[]>('/matching-results/', { params })
    return response.data
  },

  // Get single result
  getById: async (id: number) => {
    const response = await apiClient.get<MatchingResult>(`/matching-results/${id}/`)
    return response.data
  },

  // Get matches for a result
  getMatches: async (resultId: number) => {
    const response = await apiClient.get<Match[]>('/matches/', {
      params: { result: resultId },
    })
    return response.data
  },
}

export default matchingAPI
