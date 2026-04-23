# Calories-count

PWA in HTML5 that lets users take a photo of their food and get an estimated calorie count using a free AI API.

## Setup (desde el celular, sin IDE)

Solo necesitas hacer esto **una vez**:

### 1. Obtener tu API key de Gemini

Ve a [aistudio.google.com/apikey](https://aistudio.google.com/apikey) y crea una key gratis.

### 2. Guardarla en Netlify

1. Abre [app.netlify.com](https://app.netlify.com) y entra a tu sitio **calories-count-app**
2. Ve a **Site configuration** → **Environment variables**
3. Tap **Add a variable**
4. Key: `GEMINI_API_KEY`
5. Values: pega tu key (`AIza...`)
6. Tap **Create variable**

### 3. Redeploy

Ve a **Deploys** → tap **Trigger deploy** → **Deploy site**. Listo, la app abrirá directo sin pedir la key.

Cada vez que hagas push a `main`, Netlify genera `config.js` con tu key automáticamente. La key **nunca aparece en los archivos del repo**.

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
