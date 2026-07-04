# Design Skills Pack

Un solo plugin que agrupa **16 skills de diseño frontend** para usar tanto en **Claude Code** como en **Cowork**.

## Qué incluye

| Skill(s) | Origen | Qué hace |
|---|---|---|
| `emil-design-eng` | Propio (basado en Emil Kowalski) | Filosofía de pulido de UI, decisiones de animación, easing/duración |
| `impeccable` | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) (Apache-2.0) | Framework anti-slop, review de diseño, 23 comandos `/impeccable` |
| `animate-css` | Propio (ref. de [animate.css](https://github.com/animate-css/animate.css) v4.1.1, MIT) | Referencia de la librería Animate.css + `animate.min.css` embebido |
| Taste Skill (13) | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (MIT) | `design-taste-frontend`, `minimalist-ui`, `industrial-brutalist-ui`, `redesign-existing-projects`, `gpt-taste`, `high-end-visual-design`, `stitch-design-taste`, `image-to-code`, `imagegen-frontend-web`, `imagegen-frontend-mobile`, `brandkit`, `full-output-enforcement`, `design-taste-frontend-v1` |

## Instalar

### Claude Code (local)
```bash
# desde la carpeta de este repo, o apuntando a la URL de GitHub tras hacer push
claude plugin marketplace add ./design-skills-pack     # o la URL del repo
claude plugin install design-skills-pack@design-skills-pack
```
O de forma interactiva: `/plugin` → Add marketplace → esta ruta/URL → instalar.

### Cowork
Cowork consume plugins vía marketplace. Sube este repo a GitHub y en Cowork añádelo como plugin marketplace (ajustes de plugins/conectores), luego habilítalo. Al ser un plugin con `.claude-plugin/marketplace.json`, Cowork descubre las 16 skills bajo `skills/`.

## Estructura
```
.claude-plugin/
  marketplace.json
  plugin.json
skills/
  <16 skills, cada uno con su SKILL.md>
```

## Licencias / atribución
Ver `NOTICE`. Cada skill de terceros conserva su licencia original (MIT / Apache-2.0). Los skills propios (`emil-design-eng`, `animate-css`) son MIT.
