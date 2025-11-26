/**
 * CompaniesPage - Listado de Empresas Proveedoras
 * Vista con filtros, búsqueda y grid de cards
 */

import { useState } from 'react'
import { Box, Typography, Grid, TextField, Button, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import BusinessIcon from '@mui/icons-material/Business'
import LanguageIcon from '@mui/icons-material/Language'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccioCard from '../components/common/AccioCard'
import AccioBadge from '../components/common/AccioBadge'
import AccioTag from '../components/common/AccioTag'
import ProgressBar from '../components/common/ProgressBar'

const CompaniesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Datos de ejemplo
  const companies = [
    {
      id: 1,
      name: 'TechCorp Solutions',
      sector: 'IoT Industrial',
      location: 'Barcelona',
      website: 'www.techcorp.com',
      score: 92,
      status: 'active',
      tags: ['IoT', 'Cloud Computing', 'Big Data'],
    },
    {
      id: 2,
      name: 'InnovateLab',
      sector: 'IA y Machine Learning',
      location: 'Girona',
      website: 'www.innovatelab.com',
      score: 85,
      status: 'active',
      tags: ['Machine Learning', 'Computer Vision', 'NLP'],
    },
    {
      id: 3,
      name: 'GreenTech Systems',
      sector: 'Sostenibilidad',
      location: 'Tarragona',
      website: 'www.greentech.com',
      score: 78,
      status: 'active',
      tags: ['Energía Solar', 'Eficiencia Energética'],
    },
    {
      id: 4,
      name: 'DataPro Analytics',
      sector: 'Analítica de Datos',
      location: 'Barcelona',
      website: 'www.datapro.com',
      score: 88,
      status: 'active',
      tags: ['Big Data', 'Analytics', 'Business Intelligence'],
    },
  ]

  return (
    <Box>
      {/* Header */}
      <div className="franja-beige" style={{ marginBottom: 'var(--spacing-lg)' }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 'var(--spacing-xl)',
          flexWrap: 'wrap',
          gap: 'var(--spacing-md)',
        }}
      >
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'var(--font-primary)',
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 700,
              marginBottom: 'var(--spacing-sm)',
            }}
          >
            Empresas Proveedoras
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--color-gray-600)' }}>
            Gestión de empresas proveedoras de tecnología
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 'var(--spacing-md)' }}>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            sx={{
              borderColor: 'var(--color-beige)',
              color: 'var(--color-black)',
              '&:hover': {
                backgroundColor: 'var(--color-beige)',
                borderColor: 'var(--color-beige)',
              },
            }}
          >
            Exportar
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            className="btn-primary"
            sx={{
              backgroundColor: 'var(--color-beige)',
              color: 'var(--color-black)',
              '&:hover': {
                backgroundColor: 'var(--color-beige-dark)',
              },
            }}
          >
            Nueva Empresa
          </Button>
        </Box>
      </Box>

      {/* Filtros y búsqueda */}
      <AccioCard withFranja={false} hoverable={false} className="mb-lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Buscar empresas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'var(--color-gray-600)' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'var(--color-white)',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth select label="Sector" defaultValue="" sx={{ backgroundColor: 'var(--color-white)' }}>
              {/* Opciones de sector */}
            </TextField>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField fullWidth select label="Estado" defaultValue="" sx={{ backgroundColor: 'var(--color-white)' }}>
              {/* Opciones de estado */}
            </TextField>
          </Grid>
        </Grid>
      </AccioCard>

      {/* Grid de empresas */}
      <Grid container spacing={3}>
        {companies
          .filter((company) => company.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((company) => (
            <Grid item xs={12} md={6} lg={4} key={company.id}>
              <AccioCard withFranja={true} hoverable={true}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                  {/* Nombre y badge */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                      <BusinessIcon sx={{ color: 'var(--color-blue)', fontSize: 24 }} />
                      <Typography
                        variant="h4"
                        sx={{
                          fontFamily: 'var(--font-primary)',
                          fontWeight: 700,
                          fontSize: 'var(--font-size-lg)',
                        }}
                      >
                        {company.name}
                      </Typography>
                    </Box>
                    <AccioBadge type="success">{company.status}</AccioBadge>
                  </Box>

                  {/* Sector */}
                  <Box
                    sx={{
                      display: 'inline-block',
                      padding: '4px 12px',
                      backgroundColor: 'var(--color-info-light)',
                      borderRadius: 'var(--border-radius-full)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 600,
                      color: 'var(--color-info)',
                    }}
                  >
                    {company.sector}
                  </Box>

                  {/* Tags */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
                    {company.tags.map((tag, index) => (
                      <AccioTag key={index}>{tag}</AccioTag>
                    ))}
                  </Box>

                  {/* Ubicación y web */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xs)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                      <LocationOnIcon sx={{ fontSize: 16, color: 'var(--color-gray-600)' }} />
                      <Typography variant="body2" sx={{ color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)' }}>
                        {company.location}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-xs)' }}>
                      <LanguageIcon sx={{ fontSize: 16, color: 'var(--color-gray-600)' }} />
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'var(--color-blue)',
                          fontSize: 'var(--font-size-sm)',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        }}
                      >
                        {company.website}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Score de completitud */}
                  <Box sx={{ paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--color-gray-200)' }}>
                    <ProgressBar value={company.score} label="Completitud del perfil" />
                  </Box>

                  {/* Botón ver detalle */}
                  <Button
                    variant="text"
                    sx={{
                      color: 'var(--color-blue)',
                      textDecoration: 'underline',
                      padding: 0,
                      justifyContent: 'flex-start',
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: 'var(--color-blue-dark)',
                      },
                    }}
                  >
                    Ver detalle completo →
                  </Button>
                </Box>
              </AccioCard>
            </Grid>
          ))}
      </Grid>
    </Box>
  )
}

export default CompaniesPage
