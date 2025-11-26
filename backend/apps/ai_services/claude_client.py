"""
Claude API Client for ACCIÓ Matchmaking Platform
"""
import time
import json
import logging
from typing import Dict, Optional
from django.conf import settings

logger = logging.getLogger(__name__)


class ClaudeClient:
    """Cliente centralizado para interacciones con Claude API"""

    def __init__(self):
        try:
            import anthropic
            self.client = anthropic.Anthropic(
                api_key=settings.ANTHROPIC_API_KEY
            )
        except ImportError:
            logger.error("anthropic package not installed")
            self.client = None

        self.default_model = getattr(settings, 'CLAUDE_MODEL', 'claude-3-5-sonnet-20241022')
        self.max_tokens = getattr(settings, 'CLAUDE_MAX_TOKENS', 4096)

    def analyze_document(self, text: str, company_name: str) -> Dict:
        """
        Analiza un documento PDF y extrae información estructurada

        Args:
            text: Texto extraído del PDF
            company_name: Nombre de la empresa

        Returns:
            dict con información estructurada
        """
        prompt = f"""Eres un experto analista de empresas tecnológicas.
Tu tarea es analizar el siguiente documento corporativo de la empresa "{company_name}"
y extraer información estructurada.

DOCUMENTO:
{text[:15000]}  # Limitamos a ~15k caracteres para no exceder límites

Extrae la siguiente información:
1. Capacidades tecnológicas principales (máximo 10)
2. Servicios ofrecidos (máximo 10)
3. Sectores en los que tiene experiencia
4. Casos de éxito o proyectos relevantes

Responde ÚNICAMENTE con un JSON válido con esta estructura:
{{
  "capabilities": ["capacidad 1", "capacidad 2", ...],
  "services": ["servicio 1", "servicio 2", ...],
  "sectors": ["sector 1", "sector 2", ...],
  "case_studies": [
    {{
      "title": "título del caso",
      "client": "cliente (si se menciona)",
      "description": "breve descripción"
    }}
  ],
  "tags": ["tag1", "tag2", ...],
  "confidence": "low|medium|high"
}}

NO incluyas ningún texto fuera del JSON. NO uses markdown.
"""

        return self._make_request(
            prompt=prompt,
            request_type='document_analysis',
            max_tokens=2000
        )

    def scrape_website(self, url: str, company_name: str) -> Dict:
        """
        Usa Claude para acceder y analizar un sitio web

        Args:
            url: URL del sitio web
            company_name: Nombre de la empresa

        Returns:
            dict con resumen y datos extraídos
        """
        prompt = f"""Eres un experto analista de empresas tecnológicas.
Tu tarea es acceder al sitio web de la empresa "{company_name}" y extraer información relevante.

URL: {url}

Por favor, accede a esta URL y analiza el contenido del sitio web.
Luego, extrae la siguiente información:

1. Resumen ejecutivo de la empresa (300-500 palabras)
2. Capacidades tecnológicas principales
3. Servicios y productos destacados
4. Sectores de experiencia
5. Casos de uso o proyectos destacados (si están disponibles)

Responde ÚNICAMENTE con un JSON válido con esta estructura:
{{
  "executive_summary": "resumen de 300-500 palabras",
  "capabilities": ["capacidad 1", "capacidad 2", ...],
  "services": ["servicio 1", "servicio 2", ...],
  "sectors": ["sector 1", "sector 2", ...],
  "case_studies": [
    {{
      "title": "título",
      "description": "descripción breve"
    }}
  ],
  "scraped_successfully": true,
  "confidence": "low|medium|high"
}}

Si no puedes acceder al sitio web o no encuentras información relevante,
indica scraped_successfully: false.

NO incluyas ningún texto fuera del JSON. NO uses markdown.
"""

        return self._make_request(
            prompt=prompt,
            request_type='web_scraping',
            max_tokens=3000
        )

    def evaluate_company_for_challenge(
            self,
            company_data: Dict,
            challenge_data: Dict
    ) -> Dict:
        """
        Evalúa la compatibilidad entre una empresa y un challenge

        Args:
            company_data: Diccionario con toda la info de la empresa
            challenge_data: Diccionario con toda la info del challenge

        Returns:
            dict con scores y explicación
        """
        prompt = f"""Eres un experto en matchmaking entre desafíos de innovación
y empresas proveedoras de tecnología.

Tu tarea es evaluar la compatibilidad de una empresa específica con un desafío
de innovación y proporcionar un análisis detallado.

DESAFÍO DE INNOVACIÓN:
Título: {challenge_data.get('title', '')}
Descripción: {challenge_data.get('description', '')}
Requisitos: {challenge_data.get('requirements', '')}
Capacidades necesarias: {', '.join(challenge_data.get('required_capabilities', []))}
Sectores objetivo: {', '.join(challenge_data.get('sector_target', []))}

EMPRESA A EVALUAR:
Nombre: {company_data.get('name', '')}
Sector: {', '.join(company_data.get('sector', []))}
Tamaño: {company_data.get('size', 'N/A')}
Ubicación: {company_data.get('city', '')}, {company_data.get('region', '')}

Datos estructurados:
{company_data.get('context_input', 'No disponible')[:2000]}

Capacidades tecnológicas:
{', '.join(company_data.get('capabilities', []))}

Servicios:
{', '.join(company_data.get('services', []))}

Sectores de experiencia:
{', '.join(company_data.get('sectors_experience', []))}

Casos de éxito:
{self._format_case_studies(company_data.get('case_studies', []))}

Resumen del sitio web:
{company_data.get('web_summary', 'No disponible')[:1000]}

TAREA:
Evalúa la compatibilidad de esta empresa con el desafío en las siguientes dimensiones:

1. RELEVANCIA TÉCNICA (0-100): ¿Tiene las capacidades técnicas necesarias?
2. EXPERIENCIA SECTORIAL (0-100): ¿Tiene experiencia en el sector del desafío?
3. TRACK RECORD (0-100): ¿Tiene casos de éxito relevantes?

Calcula también un SCORE GLOBAL (0-100) como promedio de las tres dimensiones.

Proporciona una EXPLICACIÓN DETALLADA de 150-250 palabras que justifique
los scores y explique por qué esta empresa es o no adecuada para el desafío.

Identifica 3-5 HIGHLIGHTS (puntos clave) que resuman lo más importante del match.

Indica tu nivel de CONFIANZA (low/medium/high) en esta evaluación.

Responde ÚNICAMENTE con un JSON válido con esta estructura:
{{
  "scores": {{
    "relevancia_tecnica": 0-100,
    "experiencia_sectorial": 0-100,
    "track_record": 0-100,
    "overall": 0-100
  }},
  "explanation": "texto de 150-250 palabras explicando el match",
  "highlights": [
    "Punto clave 1",
    "Punto clave 2",
    "Punto clave 3"
  ],
  "confidence": "low|medium|high",
  "strengths": ["fortaleza 1", "fortaleza 2"],
  "considerations": ["consideración 1", "consideración 2"]
}}

NO incluyas ningún texto fuera del JSON. NO uses markdown.
"""

        return self._make_request(
            prompt=prompt,
            request_type='company_evaluation',
            max_tokens=2000,
            company_id=company_data.get('id'),
            challenge_id=challenge_data.get('id')
        )

    def _format_case_studies(self, case_studies: list) -> str:
        """Formatea casos de estudio para el prompt"""
        if not case_studies:
            return "No disponible"

        formatted = []
        for i, case in enumerate(case_studies[:5], 1):  # Max 5 casos
            formatted.append(
                f"{i}. {case.get('title', 'Sin título')} - "
                f"{case.get('description', 'Sin descripción')}"
            )
        return "\n".join(formatted)

    def _make_request(
            self,
            prompt: str,
            request_type: str,
            max_tokens: int = None,
            company_id: int = None,
            challenge_id: int = None
    ) -> Dict:
        """
        Método interno para hacer requests a Claude con logging
        """
        if not self.client:
            logger.error("Claude client not initialized")
            return {"error": "Claude client not initialized", "parse_error": True}

        from .models import AIRequest

        start_time = time.time()

        try:
            message = self.client.messages.create(
                model=self.default_model,
                max_tokens=max_tokens or self.max_tokens,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )

            execution_time = int((time.time() - start_time) * 1000)

            response_text = message.content[0].text

            # Log del request
            AIRequest.objects.create(
                request_type=request_type,
                company_id=company_id,
                challenge_id=challenge_id,
                prompt=prompt[:5000],  # Limitamos para no saturar DB
                prompt_tokens=message.usage.input_tokens,
                response=response_text[:10000],
                response_tokens=message.usage.output_tokens,
                model_used=self.default_model,
                execution_time_ms=execution_time,
                status='success',
                estimated_cost=self._calculate_cost(
                    message.usage.input_tokens,
                    message.usage.output_tokens
                )
            )

            # Intentar parsear JSON
            try:
                # Limpiar posibles markdown wrappers
                cleaned = response_text.strip()
                if cleaned.startswith('```json'):
                    cleaned = cleaned[7:]
                if cleaned.startswith('```'):
                    cleaned = cleaned[3:]
                if cleaned.endswith('```'):
                    cleaned = cleaned[:-3]
                cleaned = cleaned.strip()

                return json.loads(cleaned)
            except json.JSONDecodeError as e:
                logger.warning(f"Failed to parse JSON response: {e}")
                # Si no es JSON válido, devolver el texto raw
                return {"raw_response": response_text, "parse_error": True}

        except Exception as e:
            execution_time = int((time.time() - start_time) * 1000)
            logger.error(f"Error calling Claude API: {e}")

            # Log del error
            AIRequest.objects.create(
                request_type=request_type,
                company_id=company_id,
                challenge_id=challenge_id,
                prompt=prompt[:5000],
                prompt_tokens=0,
                response='',
                response_tokens=0,
                model_used=self.default_model,
                execution_time_ms=execution_time,
                status='error',
                error_message=str(e)
            )

            return {"error": str(e), "parse_error": True}

    def _calculate_cost(self, input_tokens: int, output_tokens: int) -> float:
        """
        Calcula el costo estimado del request
        Precios Claude 3.5 Sonnet (Nov 2025):
        - Input: $3 / 1M tokens
        - Output: $15 / 1M tokens
        """
        input_cost = (input_tokens / 1_000_000) * 3
        output_cost = (output_tokens / 1_000_000) * 15
        return input_cost + output_cost
