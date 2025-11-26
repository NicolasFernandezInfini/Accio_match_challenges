/**
 * ChallengesPage - Listado de Challenges de Innovación
 */

import { useState } from 'react'
import { Box, Typography, Grid, TextField, Button, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccioCard from '../components/common/AccioCard'
import AccioBadge from '../components/common/AccioBadge'
import AccioTag from '../components/common/AccioTag'

const ChallengesPage = () => {
  const [searchTerm, setSearchTerm] = useState('')

  // Datos de ejemplo
  const challenges = [
    {
      id: 1,
      title: 'Plataforma IoT Industrial',
      description: 'Desarrollo de una plataforma IoT para monitoreo y control de procesos industriales en tiempo real.',
      type: 'Event-Based',
      topic: 'Industria 4.0',
      status: 'active',
      date: '15/12/2025',
      tags: ['IoT', 'Cloud', 'Real-time'],
    },
    {
      id: 2,
      title: 'Sistema de IA para Diagnóstico Médico',
      description: 'Implementación de ML para análisis predictivo de datos médicos y diagnóstico asistido.',
      type: 'Permanent',
      topic: 'Salud Digital',
      status: 'active',
      date: '20/11/2025',
      tags: ['Machine Learning', 'Healthcare', 'Computer Vision'],
    },
    {
      id: 3,
      title: 'App de Movilidad Sostenible',
      description: 'Desarrollo de aplicación móvil para promover transporte sostenible en ciudades.',
      type: 'Event-Based',
      topic: 'Smart Cities',
      status: 'completed',
      date: '10/10/2025',
      tags: ['Mobile', 'Sostenibilidad', 'Transporte'],
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
            Challenges de Innovación
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--color-gray-600)' }}>
            Gestión de desafíos de innovación y matching
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            backgroundColor: 'var(--color-beige)',
            color: 'var(--color-black)',
            '&:hover': {
              backgroundColor: 'var(--color-beige-dark)',
            },
          }}
        >
          Nuevo Challenge
        </Button>
      </Box>

      {/* Filtros */}
      <AccioCard withFranja={false} hoverable={false} className="mb-lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              placeholder="Buscar challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'var(--color-gray-600)' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField fullWidth select label="Tipo" defaultValue="">
              {/* Opciones */}
            </TextField>
          </Grid>
        </Grid>
      </AccioCard>

      {/* Listado de challenges */}
      <Grid container spacing={3}>
        {challenges
          .filter((challenge) => challenge.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((challenge) => (
            <Grid item xs={12} key={challenge.id}>
              <AccioCard withFranja={true} hoverable={true}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                  {/* Header */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', flex: 1 }}>
                      <LightbulbIcon sx={{ color: 'var(--color-warning)', fontSize: 32 }} />
                      <Box>
                        <Typography
                          variant="h3"
                          sx={{
                            fontFamily: 'var(--font-primary)',
                            fontWeight: 700,
                            fontSize: 'var(--font-size-xl)',
                            marginBottom: 'var(--spacing-xs)',
                          }}
                        >
                          {challenge.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                          <CalendarTodayIcon sx={{ fontSize: 14, color: 'var(--color-gray-600)' }} />
                          <Typography variant="body2" sx={{ color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)' }}>
                            {challenge.date}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                      <AccioBadge type={challenge.status === 'active' ? 'success' : 'neutral'}>
                        {challenge.status}
                      </AccioBadge>
                      <AccioBadge type="info">{challenge.type}</AccioBadge>
                    </Box>
                  </Box>

                  {/* Descripción */}
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'var(--color-black)',
                      fontSize: 'var(--font-size-base)',
                      lineHeight: 1.6,
                    }}
                  >
                    {challenge.description}
                  </Typography>

                  {/* Tema */}
                  <Box
                    sx={{
                      display: 'inline-block',
                      padding: '6px 16px',
                      backgroundColor: 'var(--color-warning-light)',
                      borderRadius: 'var(--border-radius-sm)',
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 600,
                      color: 'var(--color-warning)',
                      alignSelf: 'flex-start',
                    }}
                  >
                    📌 {challenge.topic}
                  </Box>

                  {/* Tags */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
                    {challenge.tags.map((tag, index) => (
                      <AccioTag key={index}>{tag}</AccioTag>
                    ))}
                  </Box>

                  {/* Acciones */}
                  <Box
                    sx={{
                      paddingTop: 'var(--spacing-md)',
                      borderTop: '1px solid var(--color-gray-200)',
                      display: 'flex',
                      gap: 'var(--spacing-md)',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button
                      variant="text"
                      sx={{
                        color: 'var(--color-blue)',
                        textDecoration: 'underline',
                      }}
                    >
                      Ver detalles
                    </Button>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: 'var(--color-beige)',
                        color: 'var(--color-black)',
                        '&:hover': {
                          backgroundColor: 'var(--color-beige-dark)',
                        },
                      }}
                    >
                      Ejecutar Matching
                    </Button>
                  </Box>
                </Box>
              </AccioCard>
            </Grid>
          ))}
      </Grid>
    </Box>
  )
}

export default ChallengesPage
