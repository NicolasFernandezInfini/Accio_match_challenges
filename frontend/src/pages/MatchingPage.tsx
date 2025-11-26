/**
 * MatchingPage - Resultados de Matching
 * Vista con scoring y análisis de compatibilidad
 */

import { Box, Typography, Grid, Button, Chip } from '@mui/material'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import DescriptionIcon from '@mui/icons-material/Description'
import StarIcon from '@mui/icons-material/Star'
import AccioCard from '../components/common/AccioCard'
import AccioBadge from '../components/common/AccioBadge'
import ProgressBar from '../components/common/ProgressBar'

const MatchingPage = () => {
  // Datos de ejemplo
  const matchingInfo = {
    challengeName: 'Plataforma IoT Industrial',
    date: '22/11/2025 14:32',
    totalCompanies: 45,
    processingTime: '2m 34s',
  }

  const topMatches = [
    {
      rank: 1,
      company: 'TechCorp Solutions',
      globalScore: 94,
      scores: {
        technical: 92,
        sector: 96,
        track: 94,
      },
      explanation:
        'TechCorp tiene amplia experiencia en IoT industrial con 15 proyectos similares en manufactura. Su stack tecnológico coincide en un 96% con los requisitos del challenge.',
      highlights: [
        '15 años en IoT industrial',
        'Certificación ISO 27001',
        'Clientes: Seat, Nissan, HP',
        'Stack: AWS IoT, Azure IoT Hub, MQTT',
      ],
      confidence: 'high',
    },
    {
      rank: 2,
      company: 'InnovateLab',
      globalScore: 89,
      scores: {
        technical: 90,
        sector: 88,
        track: 89,
      },
      explanation:
        'InnovateLab ofrece soluciones innovadoras de IA aplicadas a IoT. Experiencia comprobada en proyectos de industria 4.0.',
      highlights: [
        'Especialistas en Edge Computing',
        '12 proyectos IoT completados',
        'Tecnologías: TensorFlow, Kubernetes',
        'Equipo de 25+ ingenieros',
      ],
      confidence: 'high',
    },
    {
      rank: 3,
      company: 'DataPro Analytics',
      globalScore: 82,
      scores: {
        technical: 85,
        sector: 80,
        track: 81,
      },
      explanation:
        'Sólida experiencia en analítica de datos IoT. Especialización en procesamiento de grandes volúmenes de datos en tiempo real.',
      highlights: [
        'Big Data y Real-time Analytics',
        'Experiencia con Apache Kafka',
        '8 años en el sector',
        'Partnership con AWS',
      ],
      confidence: 'medium',
    },
  ]

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'var(--color-score-high)'
    if (score >= 70) return 'var(--color-score-medium-high)'
    if (score >= 50) return 'var(--color-score-medium)'
    return 'var(--color-score-low)'
  }

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
            Resultados de Matching
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--color-gray-600)' }}>
            Challenge: <strong>{matchingInfo.challengeName}</strong>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 'var(--spacing-md)' }}>
          <Button
            variant="outlined"
            startIcon={<DescriptionIcon />}
            sx={{
              borderColor: 'var(--color-beige)',
              color: 'var(--color-black)',
            }}
          >
            Exportar Excel
          </Button>
          <Button
            variant="outlined"
            startIcon={<PictureAsPdfIcon />}
            sx={{
              borderColor: 'var(--color-beige)',
              color: 'var(--color-black)',
            }}
          >
            Exportar PDF
          </Button>
        </Box>
      </Box>

      {/* Resumen */}
      <AccioCard title="Resumen del Matching" withFranja={true} className="mb-xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 700,
                  color: 'var(--color-blue)',
                  marginBottom: 'var(--spacing-xs)',
                }}
              >
                {matchingInfo.totalCompanies}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--color-gray-600)' }}>
                Empresas analizadas
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 700,
                  color: 'var(--color-success)',
                  marginBottom: 'var(--spacing-xs)',
                }}
              >
                {topMatches.length}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--color-gray-600)' }}>
                Top matches
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="h2"
                sx={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--font-size-3xl)',
                  fontWeight: 700,
                  color: 'var(--color-warning)',
                  marginBottom: 'var(--spacing-xs)',
                }}
              >
                {matchingInfo.processingTime}
              </Typography>
              <Typography variant="body2" sx={{ color: 'var(--color-gray-600)' }}>
                Tiempo de procesamiento
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'var(--color-gray-600)',
                  fontSize: 'var(--font-size-sm)',
                  marginBottom: 'var(--spacing-xs)',
                }}
              >
                Fecha
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'var(--font-size-md)',
                  fontWeight: 600,
                }}
              >
                {matchingInfo.date}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </AccioCard>

      {/* TOP MATCHES */}
      <Typography
        variant="h2"
        sx={{
          fontFamily: 'var(--font-primary)',
          fontSize: 'var(--font-size-2xl)',
          fontWeight: 700,
          marginBottom: 'var(--spacing-lg)',
        }}
      >
        TOP {topMatches.length} MATCHES
      </Typography>

      <Grid container spacing={3}>
        {topMatches.map((match) => (
          <Grid item xs={12} key={match.rank}>
            <AccioCard withFranja={false} hoverable={false}>
              <Box
                sx={{
                  borderLeft: `4px solid ${getScoreColor(match.globalScore)}`,
                  paddingLeft: 'var(--spacing-lg)',
                  marginLeft: 'calc(-1 * var(--spacing-lg))',
                }}
              >
                {/* Header del match */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-lg)',
                    flexWrap: 'wrap',
                    gap: 'var(--spacing-md)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                    <Chip
                      label={`#${match.rank}`}
                      sx={{
                        backgroundColor: 'var(--color-beige)',
                        color: 'var(--color-black)',
                        fontWeight: 700,
                        fontSize: 'var(--font-size-md)',
                        height: 40,
                        borderRadius: 'var(--border-radius-full)',
                      }}
                    />
                    <Typography
                      variant="h3"
                      sx={{
                        fontFamily: 'var(--font-primary)',
                        fontWeight: 700,
                        fontSize: 'var(--font-size-xl)',
                      }}
                    >
                      {match.company}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                    <StarIcon sx={{ color: getScoreColor(match.globalScore), fontSize: 32 }} />
                    <Typography
                      variant="h2"
                      sx={{
                        fontFamily: 'var(--font-primary)',
                        fontSize: 'var(--font-size-3xl)',
                        fontWeight: 700,
                        color: getScoreColor(match.globalScore),
                      }}
                    >
                      {match.globalScore}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'var(--color-gray-600)' }}>
                      /100
                    </Typography>
                  </Box>
                </Box>

                {/* Scores por dimensión */}
                <Box sx={{ marginBottom: 'var(--spacing-lg)' }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      marginBottom: 'var(--spacing-md)',
                    }}
                  >
                    Scores por Dimensión
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <ProgressBar value={match.scores.technical} label="Técnica" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <ProgressBar value={match.scores.sector} label="Sectorial" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <ProgressBar value={match.scores.track} label="Track Record" />
                    </Grid>
                  </Grid>
                </Box>

                {/* Explicación */}
                <Box sx={{ marginBottom: 'var(--spacing-lg)' }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      marginBottom: 'var(--spacing-sm)',
                    }}
                  >
                    Explicación
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'var(--color-black)',
                      lineHeight: 1.7,
                      fontSize: 'var(--font-size-base)',
                    }}
                  >
                    {match.explanation}
                  </Typography>
                </Box>

                {/* Highlights */}
                <Box sx={{ marginBottom: 'var(--spacing-lg)' }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 600,
                      marginBottom: 'var(--spacing-sm)',
                    }}
                  >
                    Highlights
                  </Typography>
                  <Box component="ul" sx={{ paddingLeft: 'var(--spacing-lg)', margin: 0 }}>
                    {match.highlights.map((highlight, index) => (
                      <Typography
                        component="li"
                        key={index}
                        variant="body1"
                        sx={{
                          marginBottom: 'var(--spacing-xs)',
                          color: 'var(--color-black)',
                        }}
                      >
                        {highlight}
                      </Typography>
                    ))}
                  </Box>
                </Box>

                {/* Footer */}
                <Box
                  sx={{
                    paddingTop: 'var(--spacing-md)',
                    borderTop: '1px solid var(--color-gray-200)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <AccioBadge
                    type={match.confidence === 'high' ? 'success' : match.confidence === 'medium' ? 'warning' : 'neutral'}
                  >
                    Confianza: {match.confidence}
                  </AccioBadge>
                  <Button
                    variant="text"
                    sx={{
                      color: 'var(--color-blue)',
                      textDecoration: 'underline',
                    }}
                  >
                    Ver perfil completo →
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

export default MatchingPage
