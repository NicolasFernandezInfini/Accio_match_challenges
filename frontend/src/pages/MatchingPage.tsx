/**
 * MatchingPage - Premium Results Display with Real AI Analysis
 * Shows matching results with scores, explanations, and highlights
 */

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Box,
  Typography,
  Grid,
  Button,
  Chip,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import DescriptionIcon from '@mui/icons-material/Description'
import StarIcon from '@mui/icons-material/Star'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import BusinessIcon from '@mui/icons-material/Business'
import TimerIcon from '@mui/icons-material/Timer'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import VisibilityIcon from '@mui/icons-material/Visibility'
import RefreshIcon from '@mui/icons-material/Refresh'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { matchingAPI, MatchingResult } from '../services/matching'
import { challengesAPI } from '../services/challenges'

const MatchingPage = () => {
  const [searchParams] = useSearchParams()
  const challengeId = searchParams.get('challenge')

  const [result, setResult] = useState<MatchingResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load matching results
  const loadResults = async () => {
    if (!challengeId) {
      setError('No se especificó un challenge ID')
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError(null)
      const data = await challengesAPI.getResults(parseInt(challengeId))
      setResult(data)
    } catch (err: any) {
      setError(err.response?.data?.message || 'No hay resultados disponibles para este challenge')
      console.error('Error loading results:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadResults()
  }, [challengeId])

  // Get score color based on value
  const getScoreColor = (score: number) => {
    if (score >= 85) return '#10B981'
    if (score >= 70) return '#84CC16'
    if (score >= 50) return '#F59E0B'
    return '#F97316'
  }

  // Get score gradient
  const getScoreGradient = (score: number) => {
    if (score >= 85) return 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
    if (score >= 70) return 'linear-gradient(135deg, #84CC16 0%, #65A30D 100%)'
    if (score >= 50) return 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)'
    return 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)'
  }

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}m ${secs}s`
  }

  return (
    <Box sx={{ minHeight: '100vh', pb: 4 }}>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '64px' }}>
          <LoadingSpinner size="large" text="Cargando resultados..." />
        </Box>
      )}

      {error && !loading && (
        <Alert
          severity="error"
          sx={{
            borderRadius: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          {error}
        </Alert>
      )}

      {result && !loading && (
        <>
          {/* Premium Header */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #10B981 0%, #D1FAE5 100%)',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 8px 32px rgba(16, 185, 129, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
              }}
            />
            <CheckCircleIcon
              sx={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                fontSize: 100,
                color: 'rgba(255, 255, 255, 0.15)',
              }}
            />

            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
                <Box>
                  <Typography
                    variant="h1"
                    sx={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: { xs: '1.75rem', md: '2.25rem' },
                      fontWeight: 800,
                      marginBottom: '8px',
                      color: '#0A0A0A',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    Resultados de Matching
                  </Typography>
                  <Typography variant="h6" sx={{ color: '#424242', fontSize: '1.125rem', fontWeight: 600 }}>
                    {result.challenge_title}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Tooltip title="Actualizar">
                    <IconButton
                      onClick={loadResults}
                      sx={{
                        backgroundColor: 'white',
                        '&:hover': { backgroundColor: '#f5f5f5' },
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      }}
                    >
                      <RefreshIcon />
                    </IconButton>
                  </Tooltip>
                  <Button
                    variant="outlined"
                    startIcon={<DescriptionIcon />}
                    sx={{
                      borderColor: 'white',
                      color: '#0A0A0A',
                      backgroundColor: 'white',
                      fontWeight: 600,
                    }}
                  >
                    Excel
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PictureAsPdfIcon />}
                    sx={{
                      borderColor: 'white',
                      color: '#0A0A0A',
                      backgroundColor: 'white',
                      fontWeight: 600,
                    }}
                  >
                    PDF
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Summary Stats */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' },
                }}
              >
                <BusinessIcon sx={{ fontSize: 48, color: '#0066CC', mb: 1 }} />
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#0066CC', mb: 0.5 }}>
                  {result.total_companies_analyzed}
                </Typography>
                <Typography variant="body2" sx={{ color: '#757575', fontWeight: 500 }}>
                  Empresas analizadas
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' },
                }}
              >
                <AutoAwesomeIcon sx={{ fontSize: 48, color: '#10B981', mb: 1 }} />
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#10B981', mb: 0.5 }}>
                  {result.matches.length}
                </Typography>
                <Typography variant="body2" sx={{ color: '#757575', fontWeight: 500 }}>
                  Top matches
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' },
                }}
              >
                <TimerIcon sx={{ fontSize: 48, color: '#F59E0B', mb: 1 }} />
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#F59E0B', mb: 0.5 }}>
                  {formatTime(result.execution_time_seconds)}
                </Typography>
                <Typography variant="body2" sx={{ color: '#757575', fontWeight: 500 }}>
                  Tiempo de análisis
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  textAlign: 'center',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' },
                }}
              >
                <TrendingUpIcon sx={{ fontSize: 48, color: '#8B5CF6', mb: 1 }} />
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#8B5CF6', mb: 0.5 }}>
                  {result.matches.length > 0 ? Math.round(result.matches[0].overall_score) : 0}
                </Typography>
                <Typography variant="body2" sx={{ color: '#757575', fontWeight: 500 }}>
                  Score máximo
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* TOP MATCHES */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: '1.75rem',
              marginBottom: '24px',
              color: '#0A0A0A',
            }}
          >
            TOP {result.matches.length} MATCHES
          </Typography>

          <Grid container spacing={3}>
            {result.matches.map((match) => (
              <Grid item xs={12} key={match.id}>
                <Box
                  sx={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    padding: '32px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    transition: 'all 0.3s',
                    border: '1px solid transparent',
                    borderLeft: `6px solid ${getScoreColor(match.overall_score)}`,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                      <Chip
                        label={`#${match.rank}`}
                        sx={{
                          background: getScoreGradient(match.overall_score),
                          color: 'white',
                          fontWeight: 800,
                          fontSize: '1.125rem',
                          height: 48,
                          minWidth: 64,
                          borderRadius: '12px',
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, fontSize: '1.5rem', color: '#0A0A0A', mb: 0.5 }}>
                          {match.company_details?.name || `Empresa #${match.company}`}
                        </Typography>
                        {match.company_details?.sector && match.company_details.sector.length > 0 && (
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {match.company_details.sector.slice(0, 3).map((sector: string, index: number) => (
                              <Chip
                                key={index}
                                label={sector}
                                size="small"
                                sx={{ backgroundColor: '#E3F2FD', color: '#0066CC', fontWeight: 600, fontSize: '0.7rem', height: '24px' }}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end', mb: 0.5 }}>
                        <StarIcon sx={{ color: getScoreColor(match.overall_score), fontSize: 32 }} />
                        <Typography variant="h2" sx={{ fontWeight: 800, fontSize: '2.5rem', color: getScoreColor(match.overall_score), lineHeight: 1 }}>
                          {Math.round(match.overall_score)}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#757575', alignSelf: 'flex-end', mb: 0.5 }}>
                          /100
                        </Typography>
                      </Box>
                      <Chip
                        label={`Confianza: ${match.confidence_level}`}
                        size="small"
                        color={match.confidence_level === 'high' ? 'success' : match.confidence_level === 'medium' ? 'warning' : 'default'}
                        sx={{ fontWeight: 600, fontSize: '0.7rem', textTransform: 'uppercase' }}
                      />
                    </Box>
                  </Box>

                  {/* Scores por dimensión */}
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.875rem', mb: 2, color: '#424242', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Análisis por Dimensión
                    </Typography>
                    <Grid container spacing={2}>
                      {[
                        { label: 'Relevancia Técnica', value: match.score_technical_relevance },
                        { label: 'Experiencia Sectorial', value: match.score_sector_experience },
                        { label: 'Track Record', value: match.score_track_record },
                      ].map((dimension, idx) => (
                        <Grid item xs={12} md={4} key={idx}>
                          <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#424242', fontSize: '0.875rem' }}>
                                {dimension.label}
                              </Typography>
                              <Typography variant="body2" sx={{ fontWeight: 700, color: '#0A0A0A' }}>
                                {Math.round(dimension.value)}%
                              </Typography>
                            </Box>
                            <Box sx={{ height: '8px', backgroundColor: '#F5F5F5', borderRadius: '4px', overflow: 'hidden' }}>
                              <Box
                                sx={{
                                  height: '100%',
                                  width: `${dimension.value}%`,
                                  background: getScoreGradient(dimension.value),
                                  transition: 'width 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
                                }}
                              />
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>

                  {/* Explicación */}
                  <Box sx={{ mb: 3, p: '20px', backgroundColor: '#FAFAFA', borderRadius: '12px', borderLeft: `4px solid ${getScoreColor(match.overall_score)}` }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.875rem', mb: 1.5, color: '#424242', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Análisis de IA
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#424242', lineHeight: 1.7, fontSize: '1rem' }}>
                      {match.explanation}
                    </Typography>
                  </Box>

                  {/* Highlights */}
                  {match.highlights && match.highlights.length > 0 && (
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.875rem', mb: 1.5, color: '#424242', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Puntos Clave
                      </Typography>
                      <Grid container spacing={1}>
                        {match.highlights.map((highlight, index) => (
                          <Grid item xs={12} sm={6} key={index}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, p: '12px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #E0E0E0' }}>
                              <CheckCircleIcon sx={{ color: getScoreColor(match.overall_score), fontSize: 20, mt: 0.2 }} />
                              <Typography variant="body2" sx={{ color: '#424242', fontSize: '0.875rem', lineHeight: 1.6 }}>
                                {highlight}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  {/* Actions */}
                  <Box sx={{ display: 'flex', gap: 2, pt: '20px', borderTop: '1px solid #F5F5F5' }}>
                    <Button
                      variant="contained"
                      startIcon={<VisibilityIcon />}
                      sx={{
                        background: 'linear-gradient(135deg, #0066CC 0%, #004C99 100%)',
                        color: 'white',
                        fontWeight: 700,
                        '&:hover': {
                          boxShadow: '0 4px 16px rgba(0, 102, 204, 0.4)',
                          transform: 'translateY(-1px)',
                        },
                      }}
                    >
                      Ver perfil completo
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  )
}

export default MatchingPage
