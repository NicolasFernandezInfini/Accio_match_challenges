/**
 * ProgressBar - Progress/Score Bar Component
 * For displaying completion and scores
 */

import React from 'react'
import { Box, Typography } from '@mui/material'

interface ProgressBarProps {
  value: number // 0-100
  label?: string
  showValue?: boolean
  className?: string
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  label,
  showValue = true,
  className = '',
}) => {
  // Determinar color según el valor
  const getScoreClass = (score: number): string => {
    if (score >= 85) return 'score-high'
    if (score >= 70) return 'score-medium-high'
    if (score >= 50) return 'score-medium'
    return 'score-low'
  }

  const clampedValue = Math.min(100, Math.max(0, value))
  const scoreClass = getScoreClass(clampedValue)

  return (
    <Box className={className}>
      {/* Label y valor */}
      {(label || showValue) && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--spacing-xs)',
          }}
        >
          {label && (
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-gray-800)',
              }}
            >
              {label}
            </Typography>
          )}
          {showValue && (
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-gray-800)',
              }}
            >
              {clampedValue}%
            </Typography>
          )}
        </Box>
      )}

      {/* Barra de progreso */}
      <Box className="progress-container">
        <Box
          className={`progress-fill ${scoreClass}`}
          sx={{
            width: `${clampedValue}%`,
          }}
        />
      </Box>
    </Box>
  )
}

export default ProgressBar
