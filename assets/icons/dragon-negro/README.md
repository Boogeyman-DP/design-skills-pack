# Dragón negro — máscara frontal

Versión agresiva y de frente del dragón: cejas en V, colmillos a la vista,
doble cuerno, melena de púas y planos internos recortados para dar relieve.
Dibujo vectorial original, simétrico.

## Variantes

| Archivo | Fondo | Ojos | Nota |
|---|---|---|---|
| `negro-hueso` | hueso claro | rojo | máximo contraste, la más legible en pequeño |
| `negro-total` | hueso claro | recortados | silueta pura, sin color |
| `negro-brasa` | negro | naranja brasa | negro sobre negro, solo brillan los ojos |
| `negro-veneno` | verde muy oscuro | verde ácido | |
| `negro-oro` | negro | oro | contraste bajo a tamaño pequeño |
| `negro-sangre` | negro rojizo | rojo | contraste bajo a tamaño pequeño |

Cada una en `.svg` (vector) y `.png` (1000×1000).

- `_muestras.png` — todas, recortadas en círculo.
- `_tamano-real.png` — las mismas a 48 px, que es como se ven en la lista de chats.

## Uso

**Foto de perfil** — usa el `.png`. La composición cabe dentro del círculo de
recorte, así que no se pierden cuernos ni púas.

**Regenerar o cambiar colores**
```bash
node _build.js
```
Las paletas están en el objeto `V`. Cada una define `BG` (fondo), `BODY`
(cuerpo), `CUT` (los recortes internos, normalmente igual que `BG`) y `EYE`.

## Licencia
MIT, igual que el resto del repo. Dibujo original.
