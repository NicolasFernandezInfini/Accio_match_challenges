/**
 * AccioBadge - Badge Component with ACCIÓ Design System
 * For status indicators
 */

import React, { ReactNode } from 'react'
import { Box } from '@mui/material'

type BadgeType = 'success' | 'error' | 'warning' | 'info' | 'neutral'

interface AccioBadgeProps {
  children: ReactNode
  type?: BadgeType
  className?: string
}

const AccioBadge: React.FC<AccioBadgeProps> = ({ children, type = 'neutral', className = '' }) => {
  return (
    <Box component="span" className={`badge badge-${type} ${className}`}>
      {children}
    </Box>
  )
}

export default AccioBadge
