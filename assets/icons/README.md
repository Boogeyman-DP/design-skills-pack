# Dragones — 20 diseños

Tres familias, todas dibujo vectorial original (SVG + PNG 1000×1000).

| Carpeta | Estilo | Variantes |
|---|---|---|
| `dragon/` | máscara angular de frente y cabeza de perfil, formas planas | 8 |
| `dragon-negro/` | máscara negra agresiva: cejas en V, colmillos, planos internos | 6 |
| `dragon-oriental/` | dragón chino de trazo caligráfico y cuerpo serpenteante | 6 |

- `_todos.png` — los 20 recortados en círculo, agrupados por familia.
- `_todos-small.png` — los mismos a 48 px, el tamaño real en la lista de chats.

Cada carpeta tiene su propio `README.md` con el detalle y un `_build.js`
para regenerar o añadir paletas.

## Regenerar las hojas de contacto
```bash
node _todos.js   # escribe _todos.html y _todos-small.html
```
Luego se capturan con Playwright (Chromium headless).

## Cuál elegir

Depende del tamaño al que lo vas a ver:

- **En pequeño** (icono de la lista de chats) mandan el contraste y las formas
  grandes: `dragon-negro/negro-hueso` y `negro-total` son los que mejor aguantan.
- **En grande** (perfil abierto, web, impresión) gana el detalle:
  `dragon-oriental/` es el más trabajado, pero se empasta en miniatura.

## Licencia
MIT. Dibujos originales.
