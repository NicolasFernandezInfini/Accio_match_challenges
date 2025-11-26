/**
 * AccioTag - Tag/Chip Component with ACCIÓ Design System
 * For displaying categories, filters, etc.
 */

import React, { ReactNode } from 'react'
import { Box } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface AccioTagProps {
  children: ReactNode
  onDelete?: () => void
  className?: string
}

const AccioTag: React.FC<AccioTagProps> = ({ children, onDelete, className = '' }) => {
  return (
    <Box className={`tag ${className}`}>
      {children}
      {onDelete && (
        <CloseIcon
          sx={{
            width: 16,
            height: 16,
            cursor: 'pointer',
            '&:hover': {
              color: 'var(--color-gray-800)',
            },
          }}
          onClick={onDelete}
        />
      )}
    </Box>
  )
}

export default AccioTag
