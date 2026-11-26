import json
# from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
from .models import Serie
# Create your views here.

@csrf_exempt
def api_series(request):
    if request.method == "POST":
       try:
           dados = json.loads(request.body)

           serie = Serie(
               titulo=dados.get("titulo"),
               plataforma=dados.get("plataforma"),
               ano=dados.get("ano"),
               avaliacao=dados.get("avaliacao"),
           )

           serie.full_clean()
           serie.save()

           return JsonResponse({"id": serie.id}, status=201)

       except ValidationError as erro:
           return JsonResponse({
               "erro": "Dados inválidos.",
               "detalhes": erro.message_dict
           }, status=400)
       except (ValueError, TypeError):
           return JsonResponse({
               "erro": "Dados inválidos.",
               "detalhes": {"geral": ["Verifique se Ano e Avaliação são números válidos."]}
           }, status=400)

    series = list(Serie.objects.values())
    return JsonResponse(series, safe=False)

def resumo(request):
    series = list(Serie.objects.values())

    quantidade = len(series)

    avaliacoes = []

    for serie in series:
        avaliacoes.append(serie["avaliacao"])

    media_avaliacoes = round(sum(avaliacoes) / len(avaliacoes), 2)

    melhor = max(avaliacoes)

    for serie in series:
        if serie["avaliacao"] == melhor:
            melhor_titulo = serie["titulo"]
            break
    return JsonResponse(
        {
        "quantidade_series": quantidade,
        "media_avaliacoes" : media_avaliacoes,
        "melhor_serie" : melhor_titulo
        }
)

