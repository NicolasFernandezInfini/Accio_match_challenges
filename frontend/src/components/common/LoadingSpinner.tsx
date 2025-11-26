/**
 * LoadingSpinner - Loading indicator with ACCIÓ branding
 */

import React from 'react'
import { Box, Typography } from '@mui/material'

interface LoadingSpinnerProps {
  size?: 'medium' | 'large'
  text?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'medium', text }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--spacing-md)',
        padding: 'var(--spacing-xl)',
      }}
    >
      <Box className={`spinner ${size === 'large' ? 'spinner-large' : ''}`} />
      {text && (
        <Typography
          variant="body1"
          sx={{
            color: 'var(--color-gray-600)',
            fontSize: 'var(--font-size-base)',
          }}
        >
          {text}
        </Typography>
      )}
    </Box>
  )
}

export default LoadingSpinner
