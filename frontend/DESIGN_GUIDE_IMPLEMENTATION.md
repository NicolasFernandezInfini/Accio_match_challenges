# Implementación de la Guía de Diseño Visual ACCIÓ

## ✅ Implementación Completa

Se ha implementado completamente la guía de diseño visual de ACCIÓ en la plataforma de matchmaking.

## 📋 Cambios Implementados

### 1. Sistema de Diseño CSS (index.css)
- ✅ Variables CSS completas con todos los tokens de diseño
- ✅ Paleta de colores corporativa (Beige ACCIÓ #E6D7B8)
- ✅ Tipografía: Helvetica Neue y Open Sans
- ✅ Sistema de espaciado basado en 8px
- ✅ Componentes base: botones, inputs, cards, badges, alerts, etc.
- ✅ Utilidades CSS (padding, margin, flex, etc.)
- ✅ Responsive design con breakpoints
- ✅ Accesibilidad WCAG 2.1 AA

### 2. Tema Material UI Personalizado (theme.ts)
- ✅ Colores corporativos de ACCIÓ
- ✅ Tipografía personalizada
- ✅ Componentes MUI personalizados (Button, Card, TextField, etc.)
- ✅ Sombras y bordes según guía

### 3. Componentes de Layout
**Header (Header.tsx)**
- ✅ Franja beige identificativa (4px)
- ✅ Logo ACCIÓ (placeholder)
- ✅ Navegación principal
- ✅ Sticky header con sombra sutil

### 4. Componentes Reutilizables
**AccioCard**
- ✅ Card con franja beige opcional
- ✅ Header, body y footer personalizables
- ✅ Hover effects según guía

**AccioBadge**
- ✅ Badges para estados (success, error, warning, info, neutral)
- ✅ Colores funcionales según guía

**AccioTag**
- ✅ Tags/Chips para categorías
- ✅ Opción de eliminar con icono X

**ProgressBar**
- ✅ Barras de progreso con colores según score
- ✅ Indicadores visuales (85-100: verde, 70-84: verde claro, etc.)

**LoadingSpinner**
- ✅ Spinner con colores corporativos
- ✅ Texto opcional

### 5. Vistas Principales

**HomePage (Dashboard)**
- ✅ Franja beige en header
- ✅ Cards de estadísticas con iconos
- ✅ Accesos rápidos (CTAs destacados)
- ✅ Actividad reciente con badges

**CompaniesPage**
- ✅ Listado en grid responsive
- ✅ Filtros y búsqueda
- ✅ Cards de empresa con:
  - Franja beige identificativa
  - Badges de estado
  - Tags de capacidades
  - Score de completitud con barra
  - Hover effects

**ChallengesPage**
- ✅ Listado de challenges
- ✅ Cards con:
  - Iconos y badges
  - Descripción y tema
  - Tags de tecnologías
  - Botones de acción

**MatchingPage**
- ✅ Resultados de matching con scoring
- ✅ Cards con border-left coloreado según score
- ✅ Scores por dimensión con barras de progreso
- ✅ Explicación y highlights
- ✅ Badges de confianza

## 🎨 Características de Diseño

### Colores Corporativos
- **Beige ACCIÓ**: #E6D7B8 (color principal para CTAs y elementos destacados)
- **Azul Acento**: #0066CC (enlaces y estados activos)
- **Escala de Grises**: Del #F5F5F5 al #424242
- **Colores Funcionales**: Verde (#2E7D32), Rojo (#C62828), Naranja (#F57C00), Azul (#0288D1)

### Tipografía
- **Títulos**: Helvetica Neue (Bold 700)
- **Cuerpo**: Open Sans (Regular 400, Semibold 600)
- **Código**: Roboto Mono

### Franja Identificativa
La característica franja beige de 4px altura se aplica en:
- Header principal
- Cards destacados
- Headers de sección

### Responsive Design
- **Mobile**: < 640px - Layout adaptado, botones full-width
- **Tablet**: 640px - 1024px - Grid de 2 columnas
- **Desktop**: > 1024px - Grid de 3 columnas, todas las características

### Accesibilidad
- ✅ Contraste WCAG 2.1 AA
- ✅ Focus visible para navegación por teclado
- ✅ Área mínima de click 44x44px
- ✅ ARIA labels donde sea necesario
- ✅ Respeto por prefers-reduced-motion

## 🚀 Cómo Ejecutar

```bash
cd frontend

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📁 Estructura de Archivos

```
frontend/
├── index.html              # HTML con fuentes de Google
├── src/
│   ├── index.css          # Sistema de diseño completo
│   ├── theme.ts           # Tema Material UI personalizado
│   ├── App.tsx            # App principal con layout
│   ├── main.tsx           # Entry point
│   ├── components/
│   │   ├── layout/
│   │   │   └── Header.tsx           # Header con franja beige
│   │   └── common/
│   │       ├── AccioCard.tsx        # Card component
│   │       ├── AccioBadge.tsx       # Badge component
│   │       ├── AccioTag.tsx         # Tag/Chip component
│   │       ├── ProgressBar.tsx      # Barra de progreso
│   │       └── LoadingSpinner.tsx   # Spinner
│   └── pages/
│       ├── HomePage.tsx             # Dashboard
│       ├── CompaniesPage.tsx        # Listado empresas
│       ├── ChallengesPage.tsx       # Listado challenges
│       └── MatchingPage.tsx         # Resultados matching
```

## 🎯 Próximos Pasos (Opcional)

1. **Logo Oficial**: Reemplazar el placeholder del logo con el logo oficial de ACCIÓ + Generalitat
2. **Imágenes**: Añadir imágenes de empresas si están disponibles
3. **Sidebar**: Implementar sidebar colapsable para navegación adicional (opcional)
4. **Animaciones**: Añadir micro-interacciones adicionales
5. **Dark Mode**: Implementar modo oscuro (opcional)
6. **Exportación**: Implementar funcionalidad real de exportación Excel/PDF
7. **Formularios**: Crear formularios completos para crear/editar empresas y challenges

## 📚 Referencias

- Manual d'identificació visual corporativa d'ACCIÓ
- WCAG 2.1 Level AA Guidelines
- Material Design System
- React Best Practices

## 🐛 Notas Técnicas

- El proyecto usa Vite + React + TypeScript
- Material UI 5 para componentes base
- CSS Variables para tokens de diseño
- Mobile-first approach para responsive

---

**Versión**: 1.0
**Fecha**: Noviembre 2025
**Estado**: ✅ Implementación Completa
