/**
 * ChallengesPage - Premium Design with Real Matching
 * Connected to backend API - Execute matching functionality
 */

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  InputAdornment,
  Alert,
  Chip,
  IconButton,
  Tooltip,
  LinearProgress,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import VisibilityIcon from '@mui/icons-material/Visibility'
import RefreshIcon from '@mui/icons-material/Refresh'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { challengesAPI, Challenge } from '../services/challenges'

const ChallengesPage = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('active')
  const [executingMatching, setExecutingMatching] = useState<{ [key: number]: boolean }>({})
  const navigate = useNavigate()

  // Load challenges
  const loadChallenges = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await challengesAPI.getAll({ status: statusFilter, search: searchTerm })
      setChallenges(data)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al cargar challenges')
      console.error('Error loading challenges:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadChallenges()
  }, [statusFilter])

  // Filter locally by search
  const filteredChallenges = challenges.filter((challenge) =>
    challenge.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Execute matching
  const handleExecuteMatching = async (challengeId: number, challengeTitle: string) => {
    if (!confirm(`¿Ejecutar matching para "${challengeTitle}"?\n\nEsto analizará todas las empresas activas y generará el TOP ${challenges.find(c => c.id === challengeId)?.num_matches || 10} de matches.`)) {
      return
    }

    try {
      setExecutingMatching(prev => ({ ...prev, [challengeId]: true }))
      await challengesAPI.executeMatching(challengeId)

      alert(`✅ Matching iniciado exitosamente!\n\nEl proceso puede tardar algunos minutos dependiendo del número de empresas.\n\nRefresh la página para ver el estado actualizado.`)

      // Reload challenges to see updated status
      loadChallenges()
    } catch (err: any) {
      alert('❌ Error al ejecutar matching: ' + (err.response?.data?.error || err.message))
    } finally {
      setExecutingMatching(prev => ({ ...prev, [challengeId]: false }))
    }
  }

  // View results
  const handleViewResults = async (challengeId: number) => {
    try {
      await challengesAPI.getResults(challengeId)
      navigate(`/matching?challenge=${challengeId}`)
    } catch (err: any) {
      alert('No hay resultados disponibles aún para este challenge.')
    }
  }

  // Get status badge color and label
  const getStatusBadge = (status: string) => {
    const badges: { [key: string]: { color: 'success' | 'warning' | 'info' | 'default' | 'error', label: string } } = {
      draft: { color: 'default', label: 'Borrador' },
      active: { color: 'success', label: 'Activo' },
      matching: { color: 'warning', label: 'Procesando' },
      completed: { color: 'info', label: 'Completado' },
      archived: { color: 'default', label: 'Archivado' },
    }
    return badges[status] || { color: 'default', label: status }
  }

  // Get type badge
  const getTypeBadge = (type: string) => {
    return type === 'permanent' ? 'Permanente' : 'Event-Based'
  }

  return (
    <Box sx={{ minHeight: '100vh', pb: 4 }}>
      {/* Premium Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #F59E0B 0%, #FEF3C7 100%)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 8px 32px rgba(245, 158, 11, 0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative elements */}
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
        <AutoAwesomeIcon
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
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 800,
                  marginBottom: '8px',
                  color: '#0A0A0A',
                  letterSpacing: '-0.02em',
                }}
              >
                Challenges de Innovación
              </Typography>
              <Typography variant="body1" sx={{ color: '#424242', fontSize: '1rem', fontWeight: 500 }}>
                Gestión inteligente y matching automático con IA
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Tooltip title="Actualizar">
                <IconButton
                  onClick={loadChallenges}
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
                variant="contained"
                startIcon={<AddIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #0066CC 0%, #004C99 100%)',
                  color: 'white',
                  fontWeight: 700,
                  boxShadow: '0 4px 16px rgba(0, 102, 204, 0.3)',
                  '&:hover': {
                    boxShadow: '0 6px 20px rgba(0, 102, 204, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                Nuevo Challenge
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Search and Filters */}
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Buscar challenges por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#757575' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  backgroundColor: '#FAFAFA',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label="Activos"
                onClick={() => setStatusFilter('active')}
                color={statusFilter === 'active' ? 'primary' : 'default'}
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label="Completados"
                onClick={() => setStatusFilter('completed')}
                color={statusFilter === 'completed' ? 'primary' : 'default'}
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label="Todos"
                onClick={() => setStatusFilter('')}
                color={statusFilter === '' ? 'primary' : 'default'}
                sx={{ fontWeight: 600 }}
              />
            </Box>
          </Grid>
        </Grid>
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
          <LoadingSpinner size="large" text="Cargando challenges..." />
        </Box>
      )}

      {/* Challenges List */}
      {!loading && (
        <>
          {filteredChallenges.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                padding: '64px',
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <LightbulbIcon sx={{ fontSize: 64, color: '#E0E0E0', marginBottom: '16px' }} />
              <Typography variant="h5" sx={{ color: '#757575', fontWeight: 600 }}>
                No se encontraron challenges
              </Typography>
              <Typography variant="body2" sx={{ color: '#9E9E9E', marginTop: '8px' }}>
                Crea un nuevo challenge para comenzar el matching
              </Typography>
            </Box>
          ) : (
            <>
              <Typography variant="h6" sx={{ marginBottom: '16px', color: '#424242', fontWeight: 600 }}>
                {filteredChallenges.length} challenge{filteredChallenges.length !== 1 ? 's' : ''}
              </Typography>

              <Grid container spacing={3}>
                {filteredChallenges.map((challenge) => {
                  const statusBadge = getStatusBadge(challenge.status)
                  const isMatching = challenge.status === 'matching' || executingMatching[challenge.id]

                  return (
                    <Grid item xs={12} key={challenge.id}>
                      <Box
                        sx={{
                          backgroundColor: 'white',
                          borderRadius: '16px',
                          padding: '32px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          border: '1px solid transparent',
                          position: 'relative',
                          overflow: 'hidden',
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                            borderColor: '#FEF3C7',
                          },
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '4px',
                            background: 'linear-gradient(90deg, #F59E0B 0%, #FEF3C7 100%)',
                          },
                        }}
                      >
                        {/* Header */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flex: 1 }}>
                            <LightbulbIcon sx={{ color: '#F59E0B', fontSize: 36, mt: 0.5 }} />
                            <Box sx={{ flex: 1 }}>
                              <Typography
                                variant="h4"
                                sx={{
                                  fontWeight: 700,
                                  fontSize: '1.5rem',
                                  color: '#0A0A0A',
                                  marginBottom: '8px',
                                  lineHeight: 1.3,
                                }}
                              >
                                {challenge.title}
                              </Typography>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                  <CalendarTodayIcon sx={{ fontSize: 14, color: '#757575' }} />
                                  <Typography variant="caption" sx={{ color: '#757575', fontSize: '0.875rem' }}>
                                    {new Date(challenge.created_at).toLocaleDateString('es-ES', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    })}
                                  </Typography>
                                </Box>
                                <Chip
                                  label={statusBadge.label}
                                  color={statusBadge.color}
                                  size="small"
                                  sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                                />
                                <Chip
                                  label={getTypeBadge(challenge.type)}
                                  size="small"
                                  sx={{
                                    backgroundColor: '#E3F2FD',
                                    color: '#0066CC',
                                    fontWeight: 600,
                                    fontSize: '0.7rem',
                                  }}
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Box>

                        {/* Description */}
                        <Typography
                          variant="body1"
                          sx={{
                            color: '#424242',
                            fontSize: '1rem',
                            lineHeight: 1.7,
                            marginBottom: '20px',
                          }}
                        >
                          {challenge.description}
                        </Typography>

                        {/* Topic */}
                        {challenge.topic && (
                          <Box
                            sx={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 0.5,
                              padding: '8px 16px',
                              backgroundColor: '#FEF3C7',
                              borderRadius: '8px',
                              marginBottom: '20px',
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                color: '#F59E0B',
                                fontWeight: 600,
                                fontSize: '0.875rem',
                              }}
                            >
                              📌 {challenge.topic}
                            </Typography>
                          </Box>
                        )}

                        {/* Required Capabilities */}
                        {challenge.required_capabilities && challenge.required_capabilities.length > 0 && (
                          <Box sx={{ marginBottom: '20px' }}>
                            <Typography
                              variant="caption"
                              sx={{
                                color: '#757575',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                fontSize: '0.7rem',
                                letterSpacing: '0.5px',
                                marginBottom: '8px',
                                display: 'block',
                              }}
                            >
                              Capacidades requeridas
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                              {challenge.required_capabilities.slice(0, 5).map((cap, index) => (
                                <Chip
                                  key={index}
                                  label={cap}
                                  size="small"
                                  sx={{
                                    backgroundColor: '#F5F5F5',
                                    color: '#424242',
                                    fontWeight: 500,
                                    fontSize: '0.75rem',
                                  }}
                                />
                              ))}
                              {challenge.required_capabilities.length > 5 && (
                                <Chip
                                  label={`+${challenge.required_capabilities.length - 5} más`}
                                  size="small"
                                  sx={{
                                    backgroundColor: '#E0E0E0',
                                    color: '#757575',
                                    fontWeight: 600,
                                    fontSize: '0.75rem',
                                  }}
                                />
                              )}
                            </Box>
                          </Box>
                        )}

                        {/* Matching Progress */}
                        {isMatching && (
                          <Box
                            sx={{
                              padding: '16px',
                              backgroundColor: '#FEF3C7',
                              borderRadius: '8px',
                              marginBottom: '20px',
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, marginBottom: '8px' }}>
                              <AutoAwesomeIcon sx={{ color: '#F59E0B', fontSize: 20 }} />
                              <Typography variant="body2" sx={{ color: '#F59E0B', fontWeight: 600 }}>
                                Matching en proceso...
                              </Typography>
                            </Box>
                            <LinearProgress
                              sx={{
                                height: 6,
                                borderRadius: 3,
                                backgroundColor: 'rgba(245, 158, 11, 0.2)',
                                '& .MuiLinearProgress-bar': {
                                  backgroundColor: '#F59E0B',
                                },
                              }}
                            />
                            <Typography variant="caption" sx={{ color: '#757575', marginTop: '4px', display: 'block' }}>
                              Analizando empresas con IA...
                            </Typography>
                          </Box>
                        )}

                        {/* Actions */}
                        <Box
                          sx={{
                            display: 'flex',
                            gap: 2,
                            paddingTop: '20px',
                            borderTop: '1px solid #F5F5F5',
                            flexWrap: 'wrap',
                          }}
                        >
                          <Button
                            variant="outlined"
                            startIcon={<VisibilityIcon />}
                            sx={{
                              borderColor: '#E0E0E0',
                              color: '#424242',
                              fontWeight: 600,
                              '&:hover': {
                                borderColor: '#0066CC',
                                backgroundColor: '#E3F2FD',
                                color: '#0066CC',
                              },
                            }}
                          >
                            Ver detalles
                          </Button>

                          {challenge.status === 'completed' && (
                            <Button
                              variant="contained"
                              startIcon={<VisibilityIcon />}
                              onClick={() => handleViewResults(challenge.id)}
                              sx={{
                                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                                color: 'white',
                                fontWeight: 700,
                                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
                                '&:hover': {
                                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
                                  transform: 'translateY(-1px)',
                                },
                              }}
                            >
                              Ver Resultados
                            </Button>
                          )}

                          {(challenge.status === 'active' || challenge.status === 'draft') && !isMatching && (
                            <Button
                              variant="contained"
                              startIcon={<PlayArrowIcon />}
                              onClick={() => handleExecuteMatching(challenge.id, challenge.title)}
                              sx={{
                                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                                color: 'white',
                                fontWeight: 700,
                                boxShadow: '0 2px 8px rgba(245, 158, 11, 0.3)',
                                '&:hover': {
                                  boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)',
                                  transform: 'translateY(-1px)',
                                },
                                transition: 'all 0.2s',
                              }}
                            >
                              Ejecutar Matching
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                  )
                })}
              </Grid>
            </>
          )}
        </>
      )}
    </Box>
  )
}

export default ChallengesPage
