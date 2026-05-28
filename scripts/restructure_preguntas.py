"""
Restructurar preguntas existentes: añadir tipo y explicacion
"""
import json

with open('src/data/preguntas.json') as f:
    preguntas = json.load(f)

# Añadir tipo basado en dificultad original
for p in preguntas:
    # Añadir tipo si no existe
    if 'tipo' not in p:
        d = p.get('dificultad', 'basico')
        if d == 'básico' or d == 'basico':
            p['tipo'] = 'memoristica'
        elif d == 'media':
            p['tipo'] = 'comprension'
        else:
            p['tipo'] = 'aplicacion'
    
    # Añadir explicacion vacía
    if 'explicacion' not in p:
        p['explicacion'] = ''
    
    # Normalizar dificultad
    if p.get('dificultad') == 'básico':
        p['dificultad'] = 'basico'

# Escribir
with open('src/data/preguntas.json', 'w', encoding='utf-8') as f:
    json.dump(preguntas, f, indent=2, ensure_ascii=False)

print(f"✓ Reestructuradas {len(preguntas)} preguntas con tipo y explicacion")
