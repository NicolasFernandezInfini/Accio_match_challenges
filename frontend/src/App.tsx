import { Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            ACCIÓ Matchmaking Platform
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Plataforma de Matchmaking de Innovación con IA
          </Typography>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/matching" element={<MatchingPage />} />
          </Routes>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

function HomePage() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido a la Plataforma de Matchmaking
      </Typography>
      <Typography variant="body1">
        Esta plataforma utiliza Inteligencia Artificial para conectar desafíos de innovación
        con empresas proveedoras de tecnología en Cataluña.
      </Typography>
    </Box>
  )
}

function CompaniesPage() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Empresas Proveedoras
      </Typography>
      <Typography variant="body1">
        Gestión de empresas proveedoras de tecnología.
      </Typography>
    </Box>
  )
}

function ChallengesPage() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Challenges de Innovación
      </Typography>
      <Typography variant="body1">
        Gestión de desafíos de innovación.
      </Typography>
    </Box>
  )
}

function MatchingPage() {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Resultados de Matching
      </Typography>
      <Typography variant="body1">
        Visualización de resultados de matchmaking.
      </Typography>
    </Box>
  )
}

export default App
