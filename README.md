# ACCIÓ Matchmaking Platform - Plataforma de Matchmaking de Innovación con IA

**Versión:** 2.0
**Cliente:** ACCIÓ - Agencia para la Competitividad de la Empresa (Cataluña)

## 📋 Descripción

Plataforma web basada en Inteligencia Artificial Generativa que automatiza el proceso de scouting y matchmaking entre desafíos de innovación y proveedores tecnológicos en Cataluña.

### Características Principales

- ✅ **Gestión de Empresas Proveedoras**: Perfiles completos con datos estructurados y no estructurados
- ✅ **Web Scraping Inteligente**: Extracción automática de información de sitios web corporativos
- ✅ **Análisis de Documentos con IA**: Procesamiento de PDFs para extraer capacidades y servicios
- ✅ **Motor de Matchmaking**: Algoritmo basado en Claude API para matching semántico
- ✅ **Sistema de Explicabilidad**: Justificaciones detalladas para cada match generado
- ✅ **Multilingüe**: Soporte para catalán y español

## 🏗️ Arquitectura Técnica

### Backend
- **Framework**: Django 5.0 + Django REST Framework
- **Base de Datos**: PostgreSQL 15
- **Cache**: Redis 7
- **Tareas Asíncronas**: Celery + Redis
- **IA**: Anthropic Claude 3.5 Sonnet

### Frontend (Próximamente)
- **Framework**: React 18 + TypeScript
- **UI Library**: Material-UI
- **Estado**: React Query + Context API

## 🚀 Instalación y Setup

### Prerequisitos

- Python 3.11+
- PostgreSQL 15+
- Redis 7+
- Docker y Docker Compose (recomendado)

### Opción 1: Con Docker (Recomendado)

```bash
# Clonar repositorio
git clone https://github.com/your-org/Accio_match_challenges.git
cd Accio_match_challenges

# Copiar archivo de entorno
cp backend/.env.example backend/.env

# Editar .env y configurar variables (especialmente ANTHROPIC_API_KEY)
nano backend/.env

# Iniciar servicios con Docker Compose
docker-compose up -d

# Ejecutar migraciones
docker-compose exec web python manage.py migrate

# Crear superusuario
docker-compose exec web python manage.py createsuperuser

# Acceder a la aplicación
# API: http://localhost:8000/api/
# Admin: http://localhost:8000/admin/
# Docs: http://localhost:8000/api/docs/
# Flower (Celery): http://localhost:5555/
```

### Opción 2: Instalación Manual

```bash
# Crear entorno virtual
cd backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements/development.txt

# Configurar base de datos
createdb accio_matchmaking

# Copiar y configurar .env
cp .env.example .env
# Editar .env con tus credenciales

# Ejecutar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser

# Iniciar servidor de desarrollo
python manage.py runserver

# En otra terminal, iniciar Celery worker
celery -A config worker -l info

# En otra terminal, iniciar Celery beat
celery -A config beat -l info
```

## 📚 Documentación de la API

Una vez iniciado el servidor, accede a:

- **Swagger UI**: http://localhost:8000/api/docs/
- **OpenAPI Schema**: http://localhost:8000/api/schema/

### Endpoints Principales

#### Autenticación
```bash
POST /api/auth/token/          # Obtener JWT token
POST /api/auth/token/refresh/  # Refrescar token
```

#### Empresas
```bash
GET    /api/companies/              # Listar empresas
POST   /api/companies/              # Crear empresa
GET    /api/companies/{id}/         # Detalle de empresa
PUT    /api/companies/{id}/         # Actualizar empresa
DELETE /api/companies/{id}/         # Eliminar empresa
POST   /api/companies/{id}/trigger_scraping/  # Iniciar scraping
GET    /api/companies/{id}/export_data/       # Exportar datos (GDPR)
```

#### Documentos
```bash
GET    /api/companies/documents/     # Listar documentos
POST   /api/companies/documents/     # Subir documento
POST   /api/companies/documents/{id}/reprocess/  # Re-procesar documento
```

#### Challenges
```bash
GET    /api/challenges/              # Listar challenges
POST   /api/challenges/              # Crear challenge
GET    /api/challenges/{id}/         # Detalle de challenge
POST   /api/challenges/{id}/execute_matching/  # Ejecutar matching
GET    /api/challenges/{id}/results/           # Ver resultados
```

#### Matching
```bash
GET    /api/matching/results/        # Resultados de matching
GET    /api/matching/matches/        # Matches individuales
```

## 🔐 Seguridad y GDPR

La plataforma cumple con las regulaciones GDPR:

- ✅ Consentimiento explícito para procesamiento de datos
- ✅ Derecho al olvido (eliminación de datos)
- ✅ Portabilidad de datos
- ✅ Auditoría completa de acciones
- ✅ Encriptación de datos sensibles
- ✅ Logs inmutables

## 🧪 Testing

```bash
# Ejecutar tests
pytest

# Con coverage
pytest --cov=apps --cov-report=html
```

## 📊 Monitoreo

### Celery Tasks
Accede a Flower para monitorear tareas asíncronas:
- http://localhost:5555/

### Logs
Los logs se almacenan en `backend/logs/django.log`

### Costos de IA
Revisa los costos estimados de Claude API en:
- Admin → AI Services → AI Requests

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es propiedad de ACCIÓ - Agencia para la Competitividad de la Empresa.

## 👥 Equipo

- **Cliente**: ACCIÓ - Agencia para la Competitividad de la Empresa
- **Desarrollo**: [Tu Organización]

## 📞 Soporte

Para soporte técnico o consultas:
- Email: support@accio.cat
- Documentación: [Link a docs]

## 🗺️ Roadmap

- [x] Backend API completo
- [x] Integración con Claude API
- [x] Motor de matchmaking
- [x] Sistema de explicabilidad
- [ ] Frontend React
- [ ] Dashboard de analíticas
- [ ] Exportación de reportes avanzada
- [ ] Integración con otras fuentes de datos
