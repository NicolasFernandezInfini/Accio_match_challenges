/**
 * Dashboard API Service
 * Aggregates statistics from various endpoints
 */
import { companiesAPI } from './companies'
import { challengesAPI } from './challenges'
import { matchingAPI } from './matching'

export interface DashboardStats {
  totalCompanies: number
  totalChallenges: number
  totalMatches: number
  averageScore: number
}

export interface RecentActivity {
  id: string
  type: 'company' | 'challenge' | 'matching'
  name: string
  action: string
  timestamp: string
  url: string
}

export const dashboardAPI = {
  // Get dashboard statistics
  getStats: async (): Promise<DashboardStats> => {
    try {
      // Fetch all data in parallel
      const [companies, challenges, results] = await Promise.all([
        companiesAPI.getAll({ status: 'active' }),
        challengesAPI.getAll(),
        matchingAPI.getAll(),
      ])

      // Calculate total matches
      let totalMatches = 0
      let totalScore = 0
      let scoreCount = 0

      for (const result of results) {
        if (result.matches && result.matches.length > 0) {
          totalMatches += result.matches.length
          result.matches.forEach((match) => {
            totalScore += match.overall_score
            scoreCount++
          })
        }
      }

      const averageScore = scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0

      return {
        totalCompanies: companies.length,
        totalChallenges: challenges.length,
        totalMatches,
        averageScore,
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
      return {
        totalCompanies: 0,
        totalChallenges: 0,
        totalMatches: 0,
        averageScore: 0,
      }
    }
  },

  // Get recent activity
  getRecentActivity: async (): Promise<RecentActivity[]> => {
    try {
      const [companies, challenges, results] = await Promise.all([
        companiesAPI.getAll({ status: 'active' }),
        challengesAPI.getAll(),
        matchingAPI.getAll(),
      ])

      const activities: RecentActivity[] = []

      // Add recent companies (last 5)
      companies
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5)
        .forEach((company) => {
          activities.push({
            id: `company-${company.id}`,
            type: 'company',
            name: company.name,
            action: 'creada',
            timestamp: company.created_at,
            url: `/companies/${company.id}`,
          })
        })

      // Add recent challenges (last 5)
      challenges
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        .slice(0, 5)
        .forEach((challenge) => {
          activities.push({
            id: `challenge-${challenge.id}`,
            type: 'challenge',
            name: challenge.title,
            action: challenge.status === 'completed' ? 'completado' : 'actualizado',
            timestamp: challenge.updated_at,
            url: `/challenges/${challenge.id}`,
          })
        })

      // Add recent matching results (last 5)
      results
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 5)
        .forEach((result) => {
          activities.push({
            id: `matching-${result.id}`,
            type: 'matching',
            name: result.challenge_title || `Challenge #${result.challenge}`,
            action: result.status === 'completed' ? 'completado' : 'en proceso',
            timestamp: result.created_at,
            url: `/matching?challenge=${result.challenge}`,
          })
        })

      // Sort all activities by timestamp (most recent first) and take top 10
      return activities
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 10)
    } catch (error) {
      console.error('Error fetching recent activity:', error)
      return []
    }
  },
}

export default dashboardAPI
