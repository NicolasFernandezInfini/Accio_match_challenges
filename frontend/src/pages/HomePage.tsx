/**
 * HomePage - Premium Dashboard with Real Data
 * Vista principal con estadísticas reales y actividad reciente
 */

import { useState, useEffect } from 'react'
import { Box, Typography, Grid, Button, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import BusinessIcon from '@mui/icons-material/Business'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import LinkIcon from '@mui/icons-material/Link'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import RefreshIcon from '@mui/icons-material/Refresh'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AccioBadge from '../components/common/AccioBadge'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { dashboardAPI, DashboardStats, RecentActivity } from '../services/dashboard'

const HomePage = () => {
  const navigate = useNavigate()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load dashboard data
  const loadDashboard = async () => {
    try {
      setLoading(true)
      setError(null)
      const [statsData, activityData] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getRecentActivity(),
      ])
      setStats(statsData)
      setRecentActivity(activityData)
    } catch (err: any) {
      setError('Error al cargar el dashboard')
      console.error('Error loading dashboard:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  // Format relative time
  const getRelativeTime = (timestamp: string) => {
    const now = new Date()
    const then = new Date(timestamp)
    const diffMs = now.getTime() - then.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `Hace ${diffMins} minuto${diffMins !== 1 ? 's' : ''}`
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`
    if (diffDays < 7) return `Hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`
    return then.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' })
  }

  return (
    <Box sx={{ minHeight: '100vh', pb: 4 }}>
      {/* Premium Hero Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #0066CC 0%, #004C99 100%)',
          borderRadius: '16px',
          padding: '40px',
          marginBottom: '32px',
          boxShadow: '0 8px 32px rgba(0, 102, 204, 0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-40px',
            left: '-40px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: { xs: '2rem', md: '2.75rem' },
                  fontWeight: 800,
                  marginBottom: '12px',
                  color: 'white',
                  letterSpacing: '-0.02em',
                }}
              >
                Bienvenido a ACCIÓ Matchmaking
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.125rem', fontWeight: 400, maxWidth: '800px' }}>
                Plataforma de Matchmaking de Innovación con Inteligencia Artificial para conectar
                desafíos con empresas proveedoras de tecnología en Cataluña.
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={loadDashboard}
              sx={{
                borderColor: 'rgba(255,255,255,0.3)',
                color: 'white',
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              Actualizar
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ marginBottom: '24px', borderRadius: '12px' }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '64px' }}>
          <LoadingSpinner size="large" text="Cargando dashboard..." />
        </Box>
      )}

      {/* Dashboard Content */}
      {!loading && stats && (
        <>
          {/* Statistics Cards */}
          <Grid container spacing={3} sx={{ marginBottom: '32px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #0066CC 0%, #004C99 100%)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <BusinessIcon sx={{ fontSize: 40, color: '#0066CC', opacity: 0.8 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h2"
                      sx={{
                        fontFamily: 'var(--font-primary)',
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: '#0A0A0A',
                        marginBottom: '4px',
                      }}
                    >
                      {stats.totalCompanies}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575', fontSize: '1rem', fontWeight: 600 }}>
                      Empresas Activas
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <LightbulbIcon sx={{ fontSize: 40, color: '#F59E0B', opacity: 0.8 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h2"
                      sx={{
                        fontFamily: 'var(--font-primary)',
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: '#0A0A0A',
                        marginBottom: '4px',
                      }}
                    >
                      {stats.totalChallenges}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575', fontSize: '1rem', fontWeight: 600 }}>
                      Challenges Totales
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #10B981 0%, #059669 100%)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <LinkIcon sx={{ fontSize: 40, color: '#10B981', opacity: 0.8 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h2"
                      sx={{
                        fontFamily: 'var(--font-primary)',
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: '#0A0A0A',
                        marginBottom: '4px',
                      }}
                    >
                      {stats.totalMatches}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575', fontSize: '1rem', fontWeight: 600 }}>
                      Matches Generados
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '28px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #E6D7B8 0%, #D4C5A3 100%)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TrendingUpIcon sx={{ fontSize: 40, color: '#D4C5A3', opacity: 0.8 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h2"
                      sx={{
                        fontFamily: 'var(--font-primary)',
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: '#0A0A0A',
                        marginBottom: '4px',
                      }}
                    >
                      {stats.averageScore}%
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#757575', fontSize: '1rem', fontWeight: 600 }}>
                      Score Promedio
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          {/* Quick Actions */}
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              marginBottom: '32px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'var(--font-primary)',
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '24px',
                color: '#0A0A0A',
              }}
            >
              Acciones Rápidas
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<AddIcon />}
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/companies')}
                  sx={{
                    height: '80px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #0066CC 0%, #004C99 100%)',
                    color: 'white',
                    boxShadow: '0 4px 16px rgba(0, 102, 204, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 20px rgba(0, 102, 204, 0.4)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  Nueva Empresa
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  startIcon={<AddIcon />}
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/challenges')}
                  sx={{
                    height: '80px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                    color: 'white',
                    boxShadow: '0 4px 16px rgba(245, 158, 11, 0.3)',
                    '&:hover': {
                      boxShadow: '0 6px 20px rgba(245, 158, 11, 0.4)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  Nuevo Challenge
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => navigate('/matching')}
                  sx={{
                    height: '80px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    borderWidth: '2px',
                    borderColor: '#E6D7B8',
                    color: '#0A0A0A',
                    '&:hover': {
                      borderWidth: '2px',
                      borderColor: '#D4C5A3',
                      backgroundColor: '#FEF3E0',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  Ver Resultados
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Recent Activity */}
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #E6D7B8 0%, #D4C5A3 100%)',
              },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'var(--font-primary)',
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '24px',
                color: '#0A0A0A',
              }}
            >
              Actividad Reciente
            </Typography>

            {recentActivity.length === 0 ? (
              <Box sx={{ textAlign: 'center', padding: '32px' }}>
                <AccessTimeIcon sx={{ fontSize: 48, color: '#E0E0E0', marginBottom: '12px' }} />
                <Typography variant="body1" sx={{ color: '#757575' }}>
                  No hay actividad reciente
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {recentActivity.map((activity) => (
                  <Box
                    key={activity.id}
                    onClick={() => navigate(activity.url)}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px 20px',
                      backgroundColor: '#FAFAFA',
                      borderRadius: '12px',
                      border: '1px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        backgroundColor: '#F5F5F5',
                        borderColor: '#E6D7B8',
                        transform: 'translateX(4px)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                      <Box
                        sx={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor:
                            activity.type === 'company'
                              ? '#E3F2FD'
                              : activity.type === 'challenge'
                              ? '#FFF4E6'
                              : '#E8F5E9',
                        }}
                      >
                        {activity.type === 'company' ? (
                          <BusinessIcon sx={{ color: '#0066CC' }} />
                        ) : activity.type === 'challenge' ? (
                          <LightbulbIcon sx={{ color: '#F59E0B' }} />
                        ) : (
                          <CheckCircleIcon sx={{ color: '#10B981' }} />
                        )}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            fontWeight: 600,
                            color: '#0A0A0A',
                            marginBottom: '4px',
                            fontSize: '0.95rem',
                          }}
                        >
                          {activity.name}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <AccioBadge
                            type={
                              activity.type === 'company'
                                ? 'info'
                                : activity.type === 'challenge'
                                ? 'warning'
                                : 'success'
                            }
                          >
                            {activity.type === 'company'
                              ? 'Empresa'
                              : activity.type === 'challenge'
                              ? 'Challenge'
                              : 'Matching'}
                          </AccioBadge>
                          <Typography variant="body2" sx={{ color: '#757575', fontSize: '0.875rem' }}>
                            {activity.action}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ color: '#9E9E9E', fontSize: '0.875rem' }}>
                        {getRelativeTime(activity.timestamp)}
                      </Typography>
                      <ArrowForwardIcon sx={{ fontSize: 18, color: '#BDBDBD' }} />
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  )
}

export default HomePage
