#!/usr/bin/env python3
"""Generador de preguntas para batch Cline.
Cada batch procesa 6 temas, generando 15 nuevas preguntas por tema.
Uso: python3 gen_batch.py --batch 1 --output batch_1.json
"""
import json, sys, os

args = sys.argv[1:]
batch = None
output = None
for i, a in enumerate(args):
    if a == '--batch' and i+1 < len(args): batch = int(args[i+1])
    if a == '--output' and i+1 < len(args): output = args[i+1]

if not batch or not output:
    print("USO: gen_batch.py --batch 1-4 --output batch_N.json")
    sys.exit(1)

# Mapeo de batches a temas
batches = {
    1: {'name': 'Parte General I', 'temas': [1,2,3,4,5,6]},
    2: {'name': 'Parte General II', 'temas': [7,8,9,10,11,12]},
    3: {'name': 'Parte Especial I', 'temas': [13,14,15,16,17,18]},
    4: {'name': 'Parte Especial II', 'temas': [19,20,21,22,23,24]},
}

# Cargar preguntas existentes
with open('src/data/preguntas.json') as f:
    existentes = json.load(f)

existing_ids = set(p['id'] for p in existentes)

info = batches[batch]
print(f"Batch {batch}: {info['name']} (temas {info['temas']})")
print(f"Preguntas existentes: {len(existentes)}")
print(f"IDs existentes: {len(existing_ids)}")
print(f"Temas a procesar: tema-{', tema-'.join(str(t) for t in info['temas'])}")
print()
print("Objetivos por tema:")
for t in info['temas']:
    tema_id = f"tema-{t}"
    count = sum(1 for p in existentes if p['tema_id'] == tema_id)
    target = 25
    need = max(0, target - count)
    print(f"  {tema_id}: {count} actuales → objetivo {target} (faltan {need})")
print()
print("REGLAS DE GENERACIÓN:")
print("- Genera preguntas NUEVAS con IDs únicos (preg-221, preg-222...)")
print("- Cada pregunta DEBE tener: id, enunciado, respuestas[A-D], respuesta_correcta, tema_id, dificultad, tipo, explicacion")
print("- Distribución por tema: 8 memoristica, 8 comprension, 5 aplicacion, 3 vf, 1 caso")
print("- Las V/F tienen SOLO 2 opciones: 'Verdadero' y 'Falso' (no A-D)")
print("- Los casos prácticos: escenario real + 4 opciones de resolución")
print("- Explicacion: texto detallado de por qué es correcta y por qué no las demás")
print()
print("Formato output:")
print(f"  Escribe el JSON en {output}")
