/**
 * AccioCard - Card Component with ACCIÓ Design System
 * Features: Franja beige opcional, hover effects
 */

import React, { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'

interface AccioCardProps {
  children: ReactNode
  title?: string
  subtitle?: string
  footer?: ReactNode
  withFranja?: boolean
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

const AccioCard: React.FC<AccioCardProps> = ({
  children,
  title,
  subtitle,
  footer,
  withFranja = true,
  className = '',
  onClick,
  hoverable = true,
}) => {
  return (
    <Box
      className={`card ${hoverable ? '' : ''} ${className}`}
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': hoverable
          ? {
              boxShadow: 'var(--shadow-md)',
              transform: 'translateY(-2px)',
            }
          : {},
      }}
    >
      {/* Header con franja beige opcional */}
      {(title || subtitle) && (
        <Box className="card-header" sx={{ borderTop: withFranja ? '4px solid var(--color-beige)' : 'none' }}>
          {title && (
            <Typography
              variant="h4"
              component="h3"
              sx={{
                fontFamily: 'var(--font-primary)',
                fontWeight: 700,
                fontSize: 'var(--font-size-lg)',
                color: 'var(--color-black)',
                marginBottom: subtitle ? 'var(--spacing-xs)' : 0,
              }}
            >
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography
              variant="body2"
              sx={{
                color: 'var(--color-gray-600)',
                fontSize: 'var(--font-size-sm)',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      )}

      {/* Body */}
      <Box className="card-body">{children}</Box>

      {/* Footer opcional */}
      {footer && <Box className="card-footer">{footer}</Box>}
    </Box>
  )
}

export default AccioCard
