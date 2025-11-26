/**
 * Companies API Service
 */
import apiClient from './api'

export interface Company {
  id: number
  name: string
  cif?: string
  website?: string
  sector: string[]
  size: string
  city?: string
  region?: string
  country?: string
  status: 'active' | 'inactive'
  context_input?: string
  created_at: string
  updated_at: string
  profile?: CompanyProfile
}

export interface CompanyProfile {
  id: number
  capabilities: string[]
  services: string[]
  sectors_experience: string[]
  case_studies: any[]
  web_summary: string
  profile_completeness: number
  ai_generated_tags: string[]
  last_scraped_at?: string
}

export const companiesAPI = {
  // Get all companies
  getAll: async (params?: { status?: string; search?: string }) => {
    const response = await apiClient.get<Company[]>('/companies/', { params })
    return response.data
  },

  // Get single company
  getById: async (id: number) => {
    const response = await apiClient.get<Company>(`/companies/${id}/`)
    return response.data
  },

  // Create company
  create: async (data: Partial<Company>) => {
    const response = await apiClient.post<Company>('/companies/', data)
    return response.data
  },

  // Update company
  update: async (id: number, data: Partial<Company>) => {
    const response = await apiClient.patch<Company>(`/companies/${id}/`, data)
    return response.data
  },

  // Delete company
  delete: async (id: number) => {
    await apiClient.delete(`/companies/${id}/`)
  },

  // Execute web scraping
  scrapeWebsite: async (id: number) => {
    const response = await apiClient.post(`/companies/${id}/scrape_website/`)
    return response.data
  },
}

export default companiesAPI
