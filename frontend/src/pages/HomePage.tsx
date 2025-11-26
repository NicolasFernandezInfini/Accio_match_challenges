/**
 * HomePage - Dashboard de la plataforma ACCIÓ
 * Vista principal con estadísticas y accesos rápidos
 */

import { Box, Typography, Grid, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import AddIcon from '@mui/icons-material/Add'
import BusinessIcon from '@mui/icons-material/Business'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import LinkIcon from '@mui/icons-material/Link'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import AccioCard from '../components/common/AccioCard'
import AccioBadge from '../components/common/AccioBadge'

const HomePage = () => {
  const navigate = useNavigate()

  // Datos de ejemplo - en producción vendrían de la API
  const stats = [
    { label: 'Empresas', value: 142, icon: <BusinessIcon sx={{ fontSize: 40 }} />, color: 'var(--color-blue)' },
    { label: 'Challenges', value: 28, icon: <LightbulbIcon sx={{ fontSize: 40 }} />, color: 'var(--color-warning)' },
    { label: 'Matches', value: 186, icon: <LinkIcon sx={{ fontSize: 40 }} />, color: 'var(--color-success)' },
    { label: 'Score Promedio', value: '87%', icon: <TrendingUpIcon sx={{ fontSize: 40 }} />, color: 'var(--color-beige-darker)' },
  ]

  const recentActivity = [
    { type: 'empresa', name: 'TechCorp Solutions', action: 'creada', time: 'Hace 2 horas' },
    { type: 'challenge', name: 'Plataforma IoT Industrial', action: 'actualizado', time: 'Hace 5 horas' },
    { type: 'matching', name: 'Challenge #12', action: 'completado', time: 'Hace 1 día' },
    { type: 'empresa', name: 'InnovateLab', action: 'actualizada', time: 'Hace 2 días' },
  ]

  return (
    <Box>
      {/* Franja beige en el header de la página */}
      <div className="franja-beige" style={{ marginBottom: 'var(--spacing-lg)' }} />

      {/* Encabezado */}
      <Box sx={{ marginBottom: 'var(--spacing-xl)' }}>
        <Typography
          variant="h1"
          sx={{
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-size-3xl)',
            fontWeight: 700,
            color: 'var(--color-black)',
            marginBottom: 'var(--spacing-sm)',
          }}
        >
          Bienvenido a ACCIÓ Matchmaking
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'var(--color-gray-600)',
            fontSize: 'var(--font-size-md)',
          }}
        >
          Plataforma de Matchmaking de Innovación con Inteligencia Artificial para conectar
          desafíos con empresas proveedoras de tecnología en Cataluña.
        </Typography>
      </Box>

      {/* Estadísticas Cards */}
      <Grid container spacing={3} sx={{ marginBottom: 'var(--spacing-xl)' }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <AccioCard withFranja={false} hoverable={false}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--spacing-md)',
                  padding: 'var(--spacing-md)',
                }}
              >
                <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontFamily: 'var(--font-primary)',
                    fontSize: 'var(--font-size-3xl)',
                    fontWeight: 700,
                    color: 'var(--color-black)',
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'var(--color-gray-600)',
                    fontSize: 'var(--font-size-base)',
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            </AccioCard>
          </Grid>
        ))}
      </Grid>

      {/* Accesos Rápidos */}
      <Box sx={{ marginBottom: 'var(--spacing-xl)' }}>
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'var(--font-primary)',
            fontSize: 'var(--font-size-xl)',
            fontWeight: 700,
            marginBottom: 'var(--spacing-lg)',
          }}
        >
          Accesos Rápidos
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => navigate('/companies')}
              sx={{
                width: '100%',
                height: '80px',
                fontSize: 'var(--font-size-md)',
                backgroundColor: 'var(--color-beige)',
                color: 'var(--color-black)',
                '&:hover': {
                  backgroundColor: 'var(--color-beige-dark)',
                },
              }}
            >
              Nueva Empresa Proveedora
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => navigate('/challenges')}
              sx={{
                width: '100%',
                height: '80px',
                fontSize: 'var(--font-size-md)',
                backgroundColor: 'var(--color-beige)',
                color: 'var(--color-black)',
                '&:hover': {
                  backgroundColor: 'var(--color-beige-dark)',
                },
              }}
            >
              Nuevo Challenge de Innovación
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Actividad Reciente */}
      <AccioCard title="Actividad Reciente" withFranja={true}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          {recentActivity.map((activity, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--spacing-md)',
                backgroundColor: 'var(--color-gray-100)',
                borderRadius: 'var(--border-radius-sm)',
                '&:hover': {
                  backgroundColor: 'var(--color-gray-200)',
                },
              }}
            >
              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: 'var(--color-black)',
                    marginBottom: 'var(--spacing-xs)',
                  }}
                >
                  {activity.name}
                </Typography>
                <Box sx={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
                  <AccioBadge
                    type={
                      activity.type === 'empresa'
                        ? 'info'
                        : activity.type === 'challenge'
                        ? 'warning'
                        : 'success'
                    }
                  >
                    {activity.type}
                  </AccioBadge>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'var(--color-gray-600)',
                      fontSize: 'var(--font-size-sm)',
                    }}
                  >
                    {activity.action}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'var(--color-gray-600)',
                  fontSize: 'var(--font-size-sm)',
                }}
              >
                {activity.time}
              </Typography>
            </Box>
          ))}
        </Box>
      </AccioCard>
    </Box>
  )
}

export default HomePage
