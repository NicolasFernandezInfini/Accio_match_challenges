/**
 * CompaniesPage - Premium Design with Real Data
 * Connected to backend API
 */

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import BusinessIcon from '@mui/icons-material/Business'
import LanguageIcon from '@mui/icons-material/Language'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import RefreshIcon from '@mui/icons-material/Refresh'
import CloudIcon from '@mui/icons-material/Cloud'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import AccioCard from '../components/common/AccioCard'
import AccioBadge from '../components/common/AccioBadge'
import AccioTag from '../components/common/AccioTag'
import ProgressBar from '../components/common/ProgressBar'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { companiesAPI, Company } from '../services/companies'

const CompaniesPage = () => {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('active')

  // Load companies
  const loadCompanies = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await companiesAPI.getAll({ status: statusFilter, search: searchTerm })
      setCompanies(data)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al cargar empresas')
      console.error('Error loading companies:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCompanies()
  }, [statusFilter])

  // Filtrar localmente por búsqueda
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleScrapeWebsite = async (companyId: number, companyName: string) => {
    if (!confirm(`¿Ejecutar scraping del sitio web de ${companyName}?`)) return

    try {
      await companiesAPI.scrapeWebsite(companyId)
      alert(`Scraping iniciado para ${companyName}`)
      loadCompanies()
    } catch (err: any) {
      alert('Error al iniciar scraping: ' + (err.response?.data?.detail || err.message))
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', pb: 4 }}>
      {/* Premium Header with Gradient */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #E6D7B8 0%, #F2EBDE 100%)',
          borderRadius: '16px',
          padding: '32px',
          marginBottom: '32px',
          boxShadow: '0 8px 32px rgba(230, 215, 184, 0.3)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
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
        <Box
          sx={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.15)',
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
                Empresas Proveedoras
              </Typography>
              <Typography variant="body1" sx={{ color: '#424242', fontSize: '1rem', fontWeight: 500 }}>
                Gestión inteligente de empresas de tecnología
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Tooltip title="Actualizar">
                <IconButton
                  onClick={loadCompanies}
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
                startIcon={<FileDownloadIcon />}
                sx={{
                  borderColor: 'white',
                  color: '#0A0A0A',
                  backgroundColor: 'white',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                Exportar
              </Button>
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
                Nueva Empresa
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
              placeholder="Buscar empresas por nombre..."
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
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Chip
                label="Activas"
                onClick={() => setStatusFilter('active')}
                color={statusFilter === 'active' ? 'primary' : 'default'}
                sx={{ fontWeight: 600 }}
              />
              <Chip
                label="Todas"
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
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{ marginBottom: '24px', borderRadius: '12px' }}
        >
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '64px' }}>
          <LoadingSpinner size="large" text="Cargando empresas..." />
        </Box>
      )}

      {/* Companies Grid */}
      {!loading && (
        <>
          {filteredCompanies.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                padding: '64px',
                backgroundColor: 'white',
                borderRadius: '16px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              <BusinessIcon sx={{ fontSize: 64, color: '#E0E0E0', marginBottom: '16px' }} />
              <Typography variant="h5" sx={{ color: '#757575', fontWeight: 600 }}>
                No se encontraron empresas
              </Typography>
              <Typography variant="body2" sx={{ color: '#9E9E9E', marginTop: '8px' }}>
                Intenta ajustar los filtros o crea una nueva empresa
              </Typography>
            </Box>
          ) : (
            <>
              <Typography
                variant="h6"
                sx={{
                  marginBottom: '16px',
                  color: '#424242',
                  fontWeight: 600,
                }}
              >
                {filteredCompanies.length} empresa{filteredCompanies.length !== 1 ? 's' : ''} encontrada{filteredCompanies.length !== 1 ? 's' : ''}
              </Typography>

              <Grid container spacing={3}>
                {filteredCompanies.map((company) => (
                  <Grid item xs={12} md={6} lg={4} key={company.id}>
                    <Box
                      sx={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        padding: '24px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        border: '1px solid transparent',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                          borderColor: '#E6D7B8',
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
                      {/* Header */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flex: 1 }}>
                          <BusinessIcon sx={{ color: '#0066CC', fontSize: 28 }} />
                          <Typography
                            variant="h5"
                            sx={{
                              fontWeight: 700,
                              fontSize: '1.125rem',
                              color: '#0A0A0A',
                              lineHeight: 1.3,
                            }}
                          >
                            {company.name}
                          </Typography>
                        </Box>
                        <Chip
                          label={company.status}
                          size="small"
                          color={company.status === 'active' ? 'success' : 'default'}
                          sx={{ fontWeight: 600, textTransform: 'uppercase', fontSize: '0.7rem' }}
                        />
                      </Box>

                      {/* Sectors */}
                      {company.sector && company.sector.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          {company.sector.slice(0, 3).map((sector, index) => (
                            <Chip
                              key={index}
                              label={sector}
                              size="small"
                              sx={{
                                mr: 0.5,
                                mb: 0.5,
                                backgroundColor: '#E3F2FD',
                                color: '#0066CC',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                              }}
                            />
                          ))}
                          {company.sector.length > 3 && (
                            <Chip
                              label={`+${company.sector.length - 3}`}
                              size="small"
                              sx={{
                                mr: 0.5,
                                mb: 0.5,
                                backgroundColor: '#F5F5F5',
                                color: '#757575',
                                fontWeight: 600,
                                fontSize: '0.75rem',
                              }}
                            />
                          )}
                        </Box>
                      )}

                      {/* Location and Website */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                        {(company.city || company.region) && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationOnIcon sx={{ fontSize: 16, color: '#757575' }} />
                            <Typography variant="body2" sx={{ color: '#757575', fontSize: '0.875rem' }}>
                              {[company.city, company.region].filter(Boolean).join(', ')}
                            </Typography>
                          </Box>
                        )}
                        {company.website && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LanguageIcon sx={{ fontSize: 16, color: '#757575' }} />
                            <Typography
                              variant="body2"
                              component="a"
                              href={company.website}
                              target="_blank"
                              sx={{
                                color: '#0066CC',
                                fontSize: '0.875rem',
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' },
                              }}
                            >
                              {company.website.replace(/^https?:\/\/(www\.)?/, '')}
                            </Typography>
                          </Box>
                        )}
                      </Box>

                      {/* Profile Completeness */}
                      {company.profile && (
                        <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid #F5F5F5' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="caption" sx={{ color: '#757575', fontWeight: 600 }}>
                              Completitud del perfil
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              {company.profile.profile_completeness >= 70 && (
                                <CheckCircleIcon sx={{ fontSize: 16, color: '#10B981' }} />
                              )}
                              <Typography variant="caption" sx={{ color: '#0A0A0A', fontWeight: 700 }}>
                                {company.profile.profile_completeness}%
                              </Typography>
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              height: '6px',
                              backgroundColor: '#F5F5F5',
                              borderRadius: '3px',
                              overflow: 'hidden',
                            }}
                          >
                            <Box
                              sx={{
                                height: '100%',
                                width: `${company.profile.profile_completeness}%`,
                                background:
                                  company.profile.profile_completeness >= 85
                                    ? 'linear-gradient(90deg, #10B981 0%, #059669 100%)'
                                    : company.profile.profile_completeness >= 70
                                    ? 'linear-gradient(90deg, #84CC16 0%, #65A30D 100%)'
                                    : 'linear-gradient(90deg, #F59E0B 0%, #D97706 100%)',
                                transition: 'width 0.5s cubic-bezier(0.65, 0, 0.35, 1)',
                              }}
                            />
                          </Box>
                        </Box>
                      )}

                      {/* Actions */}
                      <Box sx={{ display: 'flex', gap: 1, mt: 3 }}>
                        <Button
                          size="small"
                          variant="text"
                          sx={{
                            color: '#0066CC',
                            fontWeight: 600,
                            '&:hover': { backgroundColor: '#E3F2FD' },
                          }}
                        >
                          Ver detalles
                        </Button>
                        {company.website && (
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<CloudIcon />}
                            onClick={() => handleScrapeWebsite(company.id, company.name)}
                            sx={{
                              borderColor: '#E0E0E0',
                              color: '#757575',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              '&:hover': {
                                borderColor: '#E6D7B8',
                                backgroundColor: '#FEF3E0',
                                color: '#0A0A0A',
                              },
                            }}
                          >
                            Scraping
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </>
      )}
    </Box>
  )
}

export default CompaniesPage
