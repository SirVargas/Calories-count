# Calories-count

PWA in HTML5 that lets users take a photo of their food and get an estimated calorie count using a free AI API.

## Setup (desde el celular, sin IDE)

Solo necesitas hacer esto **una vez**:

### 1. Obtener tu API key de Gemini

Ve a [aistudio.google.com/apikey](https://aistudio.google.com/apikey) y crea una key gratis.

### 2. Guardarla como secreto en tu repo

1. En tu repo de GitHub, ve a **Settings** → **Secrets and variables** → **Actions**
2. Tap **New repository secret**
3. Name: `GEMINI_API_KEY`
4. Secret: pega tu key (empieza con `AIza...`)
5. Tap **Add secret**

### 3. Activar GitHub Pages

1. En tu repo, ve a **Settings** → **Pages**
2. En **Source**, selecciona **GitHub Actions**
3. Listo

### 4. Deploy

Cada vez que hagas push a `main`, GitHub Actions genera `config.js` con tu key (desde el secreto) y despliega la app a GitHub Pages automáticamente. Tu key **nunca aparece en los archivos del repo**.

También puedes ir a la pestaña **Actions** y correr el workflow manualmente con **Run workflow**.

## Desarrollo local

Si algún día quieres correr la app localmente, crea `config.js` a mano:

```js
const CALORIQ_CONFIG = {
  GEMINI_API_KEY: 'tu-key-aquí',
  GEMINI_MODEL: 'gemini-2.0-flash-lite',
  DEFAULT_DAILY_GOAL: 2000,
};
```

Este archivo está en `.gitignore`, así que no se subirá al repo.
