from fastapi import APIRouter, HTTPException
import httpx

from ..config import get_settings
from ..schemas import AiEnhanceRequest, AiEnhanceResponse

router = APIRouter()
settings = get_settings()


async def _call_openrouter(prompt: str) -> str:
    if not settings.openrouter_api_key:
        return f"[Sugestão offline] {prompt}"

    headers = {
        "Authorization": f"Bearer {settings.openrouter_api_key}",
        "Content-Type": "application/json",
    }
    payload = {
        "model": settings.openrouter_model,
        "messages": [
            {
                "role": "system",
                "content": "Você é um assistente de redação para planejamento e compras públicas. Melhore a formalidade, correção gramatical e complete a memória de cálculo seguindo boas práticas da Lei 14.133/2021.",
            },
            {"role": "user", "content": prompt},
        ],
        "temperature": settings.openrouter_temperature,
    }

    async with httpx.AsyncClient(base_url=settings.openrouter_base_url, timeout=60) as client:
        response = await client.post("/chat/completions", json=payload, headers=headers)
        if response.status_code >= 400:
            raise HTTPException(status_code=502, detail=f"Erro ao consultar OpenRouter: {response.text}")

        data = response.json()
        choice = data.get("choices", [{}])[0].get("message", {})
        return choice.get("content", "")


def _build_prompt(payload: AiEnhanceRequest) -> str:
    actions = {
        "formalizar_texto": "Reescreva o texto com linguagem formal, mantendo contexto público e clareza.",
        "memoria_calculo": "Revise e detalhe a memória de cálculo, apresente premissas, fontes de preço e unidade de medida.",
        "ortografia": "Corrija ortografia e concordância mantendo sentido original.",
        "descritivo_item": "Crie ou refine o descritivo técnico do item/solicitação, incluindo CATMAT/CATSER quando houver.",
    }
    objetivo = actions.get(payload.modo, "Aprimore o texto para uso em documentos oficiais de compras públicas.")
    contexto = payload.contexto or ""
    return f"Objetivo: {objetivo}\nContexto adicional: {contexto}\nTexto:\n{payload.texto}".strip()


@router.post("/enhance", response_model=AiEnhanceResponse)
async def enhance_text(payload: AiEnhanceRequest) -> AiEnhanceResponse:
    prompt = _build_prompt(payload)
    suggestion = await _call_openrouter(prompt)
    return AiEnhanceResponse(sugestao=suggestion)
