import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Container, Box } from '@mui/material'
import theme from './theme'
import Header from './components/layout/Header'
import HomePage from './pages/HomePage'
import CompaniesPage from './pages/CompaniesPage'
import ChallengesPage from './pages/ChallengesPage'
import MatchingPage from './pages/MatchingPage'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          backgroundColor: 'var(--color-white)',
        }}
      >
        <Header />

        <Container
          maxWidth="xl"
          sx={{
            marginTop: 'var(--spacing-lg)',
            marginBottom: 'var(--spacing-xl)',
            flex: 1,
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/challenges" element={<ChallengesPage />} />
            <Route path="/matching" element={<MatchingPage />} />
          </Routes>
        </Container>

        {/* Footer opcional */}
        <Box
          component="footer"
          sx={{
            borderTop: '1px solid var(--color-gray-200)',
            padding: 'var(--spacing-lg)',
            marginTop: 'auto',
            textAlign: 'center',
            color: 'var(--color-gray-600)',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          © 2025 ACCIÓ - Catalonia Trade & Investment. Plataforma de Matchmaking de Innovación con IA.
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default App
