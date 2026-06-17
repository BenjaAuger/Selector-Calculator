# Calculadora del Selector Aleatorio — ALCOSAFE Chile

[![Deploy GitHub Pages](https://github.com/BenjaAuger/Selector-Calculator/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/BenjaAuger/Selector-Calculator/actions/workflows/deploy-pages.yml)

Herramienta web para configurar el **selector aleatorio de trabajadores** mediante interruptores físicos. Replica la lógica de la hoja **Calculadora** del archivo Excel `selector_completo_v3 (2).xlsx`.

**Repositorio:** [github.com/BenjaAuger/Selector-Calculator](https://github.com/BenjaAuger/Selector-Calculator)

**Sitio en vivo (GitHub Pages):** [benjaauger.github.io/Selector-Calculator](https://benjaauger.github.io/Selector-Calculator/)

---

## ¿Qué problema resuelve?

El dispositivo selector aleatorio utiliza **8 interruptores binarios** con pesos en porcentaje (64%, 32%, 16%, 8%, 4%, 2%, 1%, 0.5%). Activar una combinación de interruptores define un **umbral de selección**: cada trabajador recibe un número aleatorio entre 0 y 100, y si es menor o igual al umbral, queda seleccionado.

Esta calculadora traduce de forma sencilla:

1. **Total de trabajadores** en la empresa
2. **Cantidad a seleccionar** (estimativa)

…al **porcentaje**, **umbral redondeado** y **interruptores a activar** en el dispositivo.

## Ejemplo

| Entrada | Valor |
|---------|-------|
| Total trabajadores | 138 |
| A seleccionar | 25 |
| Porcentaje exacto | 18.12% |
| Umbral configurado | 18% |
| Interruptores activos | **16%** y **2%** |

## Flujo de uso

```
Landing → Paso 1 (total) → Paso 2 (a seleccionar) → Resultado + panel interactivo de interruptores
```

- **Tutorial interactivo** en español en la primera visita (botón **Ayuda** para reabrirlo).
- **Panel de interruptores interactivo**: al hacer clic en cada interruptor, el umbral, la estimación y las etiquetas se actualizan en tiempo real.
- **Restaurar sugerencia**: vuelve a la configuración calculada automáticamente.

## Tabla de interruptores

| Interruptor | Peso |
|-------------|------|
| Col64 | 64% |
| Col32 | 32% |
| Col16 | 16% |
| Col8 | 8% |
| Col4 | 4% |
| Col2 | 2% |
| Col1 | 1% |
| Col05 | 0.5% |

El umbral se redondea al **0.5% más cercano** (equivalente a `MROUND` de Excel).

---

## Requisitos

- Node.js 18+
- npm 9+

## Instalación y desarrollo local

```bash
git clone https://github.com/BenjaAuger/Selector-Calculator.git
cd Selector-Calculator
npm install
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) en el navegador.

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Compila a carpeta `dist/` |
| `npm run preview` | Previsualiza el build de producción |
| `npm test` | Ejecuta tests unitarios (Vitest) |
| `npm run test:watch` | Tests en modo observación |
| `npm run lint` | Linter ESLint |

---

## Despliegue en línea

### GitHub Pages (recomendado — ya configurado)

El repositorio incluye el workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) que, en cada push a `main`:

1. Instala dependencias
2. Ejecuta tests
3. Compila con `base=/Selector-Calculator/`
4. Publica en GitHub Pages

**Activar GitHub Pages (solo la primera vez):**

1. Ir a **Settings → Pages** en el repositorio
2. En **Build and deployment → Source**, seleccionar **GitHub Actions**
3. Tras el primer push a `main`, la URL quedará disponible en:
   `https://benjaauger.github.io/Selector-Calculator/`

### Cloudflare Pages (alternativa)

Si prefieres dominio propio o CDN de Cloudflare:

1. Crear proyecto en [Cloudflare Pages](https://pages.cloudflare.com/)
2. Conectar el repositorio de GitHub
3. Configuración de build:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (raíz del repo)
4. Para dominio raíz (`tudominio.com`), el `base` en Vite debe ser `/` (no `/Selector-Calculator/`)

| Opción | Ventaja | URL típica |
|--------|---------|------------|
| **GitHub Pages** | Integrado con el repo, sin cuenta extra, CI incluido | `usuario.github.io/Selector-Calculator` |
| **Cloudflare Pages** | CDN global, dominio personalizado fácil | `tudominio.com` |

Para este proyecto, **GitHub Pages es suficiente** y ya está automatizado.

### Otras plataformas

También compatible con Vercel y Netlify (`vercel.json` y `netlify.toml` incluidos). Build: `npm run build`, salida: `dist/`.

---

## Arquitectura

```
src/
├── domain/              # Lógica pura (sin UI)
│   ├── calculator.ts
│   ├── combinations.ts
│   ├── liveResult.ts
│   ├── percentage.ts
│   └── switchEncoder.ts
├── application/         # Hooks
│   └── useSelectorCalculator.ts
├── features/
│   ├── calculator/      # Wizard 2 pasos + resultado
│   ├── switch-viewer/   # Panel DIP interactivo
│   └── tutorial/        # Guía en español
├── components/          # UI reutilizable + BrandLogo
└── pages/
tests/domain/            # Tests unitarios
public/                  # Logo ALCOSAFE, favicon
```

### Equivalencia con Excel

| Excel | Código |
|-------|--------|
| `=B2/B1*100` | `calculatePercentage()` |
| `=MROUND(B3, 0.5)` | `roundThreshold()` |
| `INDEX/MATCH` en Combinaciones | `findCombinationByThreshold()` |

Las hojas **Combinaciones** y **Evaluacion** del Excel no se exponen al usuario; su lógica está en `domain/` y validada con tests.

---

## Tests

```bash
npm test
```

- Redondeo MROUND (18.11594203 → 18)
- Codificación de interruptores (umbral 18 → 16% + 2%)
- 256 combinaciones únicas (0% – 127.5%)
- Panel interactivo: recálculo en vivo al alternar interruptores
- Caso integrado: 138 trabajadores, 25 a seleccionar

---

## Versiones y tags

| Tag | Descripción |
|-----|-------------|
| `v1.0.0` | Versión inicial: calculadora, panel interactivo, tutorial, logo ALCOSAFE, despliegue GitHub Pages |

```bash
git fetch --tags
git checkout v1.0.0
```

---

## `.gitignore` — qué se excluye del repositorio

| Patrón | Motivo |
|--------|--------|
| `node_modules/` | Dependencias (se reinstalan con `npm install`) |
| `dist/` | Build generado (se produce en CI) |
| `.env`, `.env.*` | Secretos y variables locales |
| `.vite/`, `coverage/` | Caché y reportes de tests |
| `.cursor/` | Configuración local del IDE |
| `*.log` | Logs de desarrollo |
| `.DS_Store`, `Thumbs.db` | Archivos del sistema operativo |

El Excel fuente (`selector_completo_v3 (2).xlsx`) puede mantenerse fuera del repo por tamaño; la lógica ya está implementada en código.

---

## Stack tecnológico

- **Vite 8** + **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Vitest** para tests
- SPA estática sin backend

---

## Licencia

Uso interno — ALCOSAFE Chile.
