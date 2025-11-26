/**
 * Header Component - ACCIÓ Matchmaking Platform
 * Features: Franja beige identificativa, logo ACCIÓ, navegación
 */

import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import BusinessIcon from '@mui/icons-material/Business'
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import LinkIcon from '@mui/icons-material/Link'
import HomeIcon from '@mui/icons-material/Home'

const Header = () => {
  const navigate = useNavigate()

  return (
    <AppBar position="sticky" elevation={0}>
      {/* Franja Beige Identificativa ACCIÓ */}
      <div className="franja-beige" />

      <Container maxWidth="xl">
        <Toolbar sx={{ padding: '8px 0' }}>
          {/* Logo y título */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexGrow: 1,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            {/* Placeholder para logo ACCIÓ - reemplazar con imagen real */}
            <Box
              sx={{
                width: 180,
                height: 40,
                backgroundColor: 'var(--color-beige)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                fontFamily: 'var(--font-primary)',
                fontWeight: 700,
                fontSize: '1.25rem',
                color: 'var(--color-black)',
              }}
            >
              ACCIÓ
            </Box>
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontFamily: 'var(--font-web)',
                fontWeight: 600,
                color: 'var(--color-black)',
                display: { xs: 'none', md: 'block' },
              }}
            >
              Matchmaking Platform
            </Typography>
          </Box>

          {/* Navegación */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              sx={{
                color: 'var(--color-black)',
                '&:hover': {
                  backgroundColor: 'var(--color-gray-100)',
                },
              }}
            >
              Inicio
            </Button>
            <Button
              color="inherit"
              startIcon={<BusinessIcon />}
              onClick={() => navigate('/companies')}
              sx={{
                color: 'var(--color-black)',
                '&:hover': {
                  backgroundColor: 'var(--color-gray-100)',
                },
              }}
            >
              Empresas
            </Button>
            <Button
              color="inherit"
              startIcon={<LightbulbIcon />}
              onClick={() => navigate('/challenges')}
              sx={{
                color: 'var(--color-black)',
                '&:hover': {
                  backgroundColor: 'var(--color-gray-100)',
                },
              }}
            >
              Challenges
            </Button>
            <Button
              color="inherit"
              startIcon={<LinkIcon />}
              onClick={() => navigate('/matching')}
              sx={{
                color: 'var(--color-black)',
                '&:hover': {
                  backgroundColor: 'var(--color-gray-100)',
                },
              }}
            >
              Matching
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
