# Dragón oriental — trazo caligráfico

Dragón chino de perfil con cuerpo serpenteante, bigotes, astas ramificadas y
líneas blancas en negativo que estructuran la silueta. Dibujo vectorial
original, inspirado en el estilo tradicional de tinta — no es copia de
ninguna ilustración concreta.

## Variantes

| Archivo | Tinta | Fondo |
|---|---|---|
| `oriental-tinta` | negro | hueso |
| `oriental-noche` | hueso | negro |
| `oriental-oro` | oro | negro |
| `oriental-sangre` | rojo oscuro | hueso |
| `oriental-jade` | jade | verde muy oscuro |
| `oriental-brasa` | naranja brasa | negro |

Cada una en `.svg` y `.png` (2048×2048).

- `_muestras.png` — todas, recortadas en círculo.
- `_tamano-real.png` — a 48 px, el tamaño de la lista de chats.

## Resolución

El SVG no tiene resolución: es geometría, se ve nítido a cualquier tamaño,
desde un icono de 16 px hasta una pared. Los PNG se exportan a 2048×2048,
pero si necesitas más basta con subir el viewport en el render:

```bash
node _build.js   # regenera los SVG
```

## Aviso sobre el tamaño

Este estilo vive del trazo fino (bigotes, púas, líneas en negativo). A 48 px
esos trazos se empastan y el dragón se lee como una mancha con cabeza. Se ve
muy bien en grande — foto de perfil abierta, web, impresión — pero para el
icono diminuto de la lista de chats aguanta mejor la máscara angular de
`../dragon-negro/`.

## Cómo está hecho

`_build.js` no dibuja con paths a mano: genera trazos de grosor variable a
partir de una línea central. `ribbon(puntos, w)` toma una polilínea, la
suaviza con Catmull-Rom y la engorda según la función de grosor `w(t)`:

- `spike(n)` — base gruesa, punta afilada (cuernos, púas, barba)
- `fat(n)` — se mantiene grueso y afina solo al final (el cuerpo)
- `t => n*(1-t)**1.3` — bigotes

El encuadre se calcula solo: mide todos los puntos del dibujo y lo escala
para que quepa justo dentro del círculo de recorte.

```bash
node _build.js   # regenera los SVG
```
Las paletas están en el objeto `V` (`INK` y `PAPER`).

## Licencia
MIT, igual que el resto del repo. Dibujo original.
