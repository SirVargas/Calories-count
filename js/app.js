/* ─────────────────────────────────────────────────────────
   TRANSLATIONS
───────────────────────────────────────────────────────── */
const TRANSLATIONS = {
  en: {
    appTitle: 'Calori',
    logMeal: 'Log a meal',
    editGoal: 'Edit goal',
    protein: 'Protein',
    carbs: 'Carbs',
    fat: 'Fat',
    gallery: 'Gallery',
    camera: 'Camera',
    analyze: 'Analyze',
    selectPhoto: 'Select or take a photo of your meal',
    identifyingMeal: 'Identifying your meal',
    takesSeconds: 'This takes a few seconds',
    goBack: 'Go back',
    analysisFailed: 'Analysis failed',
    kcalEstimated: 'kcal estimated',
    highConf: '✓ High confidence',
    medConf: '~ Moderate confidence',
    lowConf: '? Low confidence — please adjust',
    macronutrients: 'Macronutrients',
    itemsDetected: 'Items detected',
    noItemsDetected: 'No items detected',
    adjustValues: 'Adjust values',
    name: 'Name',
    calories: 'Calories',
    retake: 'Retake',
    saveToLog: 'Save to log →',
    dailyCalGoal: 'Daily calorie goal',
    setTarget: 'Set your target for the day.',
    saveGoal: 'Save goal',
    goalUpdated: '✓ Daily goal updated to',
    goalError: 'Please enter a goal between 500 and 9999 kcal',
    mealSaved: '✓ Meal saved to today\'s log',
    removeThisMeal: 'Remove this meal?',
    deleteEntry: 'This entry will be deleted from your log.',
    cancel: 'Cancel',
    delete: 'Delete',
    editMeal: 'Edit meal',
    saveChanges: 'Save changes',
    noMealsToday: 'No meals logged today.',
    tapToStart: 'Tap <strong>Log a meal</strong> to get started.',
    setupTitle: 'Caloriq',
    setupSub: 'Enter your Gemini API key to get started.',
    apiKeyLabel: 'Gemini API Key',
    apiKeyHint: 'Get your free key at <a href="https://aistudio.google.com/app/apikey" target="_blank">aistudio.google.com</a>',
    saveKey: 'Save & continue',
    apiKeyError: 'Enter a valid Gemini API key (starts with AIza…)',
    failedLoadImage: 'Failed to load image',
    couldNotParse: 'Could not parse AI response. The model returned unexpected text.',
    quotaExceeded: 'API quota exceeded. Please check your Gemini plan or wait a moment before retrying.',
    yourMeal: 'Your meal',
    statsTitle: 'Statistics',
    statsDay: 'Day',
    statsWeek: 'Week',
    statsMonth: 'Month',
    dailyCalories: 'Daily Calories',
    macroDistribution: 'Macro Distribution',
    calorieTrend: 'Calorie Trend',
  },
  es: {
    appTitle: 'Calori',
    logMeal: 'Registrar comida',
    editGoal: 'Editar meta',
    protein: 'Proteína',
    carbs: 'Carbohidratos',
    fat: 'Grasa',
    gallery: 'Galería',
    camera: 'Cámara',
    analyze: 'Analizar',
    selectPhoto: 'Selecciona o toma una foto de tu comida',
    identifyingMeal: 'Identificando tu comida',
    takesSeconds: 'Esto toma unos segundos',
    goBack: 'Regresar',
    analysisFailed: 'Error en el análisis',
    kcalEstimated: 'kcal estimadas',
    highConf: '✓ Alta confianza',
    medConf: '~ Confianza moderada',
    lowConf: '? Confianza baja — por favor ajusta',
    macronutrients: 'Macronutrientes',
    itemsDetected: 'Elementos detectados',
    noItemsDetected: 'No se detectaron elementos',
    adjustValues: 'Ajustar valores',
    name: 'Nombre',
    calories: 'Calorías',
    retake: 'Retomar',
    saveToLog: 'Guardar en registro →',
    dailyCalGoal: 'Meta calórica diaria',
    setTarget: 'Establece tu objetivo del día.',
    saveGoal: 'Guardar meta',
    goalUpdated: '✓ Meta diaria actualizada a',
    goalError: 'Ingresa una meta entre 500 y 9999 kcal',
    mealSaved: '✓ Comida guardada en el registro de hoy',
    removeThisMeal: '¿Eliminar esta comida?',
    deleteEntry: 'Esta entrada se eliminará de tu registro.',
    cancel: 'Cancelar',
    delete: 'Eliminar',
    editMeal: 'Editar comida',
    saveChanges: 'Guardar cambios',
    noMealsToday: 'No hay comidas registradas hoy.',
    tapToStart: 'Toca <strong>Registrar comida</strong> para comenzar.',
    setupTitle: 'Caloriq',
    setupSub: 'Ingresa tu clave de API de Gemini para comenzar.',
    apiKeyLabel: 'Clave API de Gemini',
    apiKeyHint: 'Obtén tu clave gratuita en <a href="https://aistudio.google.com/app/apikey" target="_blank">aistudio.google.com</a>',
    saveKey: 'Guardar y continuar',
    apiKeyError: 'Ingresa una clave de API de Gemini válida (comienza con AIza…)',
    failedLoadImage: 'Error al cargar imagen',
    couldNotParse: 'No se pudo procesar la respuesta de la IA. El modelo devolvió texto inesperado.',
    quotaExceeded: 'Cuota de API excedida. Revisa tu plan de Gemini o espera un momento antes de reintentar.',
    yourMeal: 'Tu comida',
    statsTitle: 'Estadísticas',
    statsDay: 'Día',
    statsWeek: 'Semana',
    statsMonth: 'Mes',
    dailyCalories: 'Calorías Diarias',
    macroDistribution: 'Distribución de Macros',
    calorieTrend: 'Tendencia de Calorías',
  }
};

/* ─────────────────────────────────────────────────────────
   STATE & STORAGE
───────────────────────────────────────────────────────── */
const DB_KEY = 'caloriq_v1';
let state = {
  screen: 'setup',
  lang: 'en',
  apiKey: '',
  dailyGoal: 2000,
  meals: [],
  currentPhoto: null,
  currentResult: null,
  deleteTarget: null,
  editTarget: null,
  statsView: 'day',
  charts: {},
};

function t(key) {
  return (TRANSLATIONS[state.lang] || TRANSLATIONS.en)[key] || key;
}

function loadState() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      state.apiKey = saved.apiKey || '';
      state.dailyGoal = saved.dailyGoal || 2000;
      state.meals = saved.meals || [];
      state.lang = saved.lang || 'en';
    }
  } catch(e) {
    console.warn('[Caloriq] loadState parse error:', e);
  }

  if (typeof CALORIQ_CONFIG !== 'undefined' && CALORIQ_CONFIG.GEMINI_API_KEY) {
    state.apiKey = CALORIQ_CONFIG.GEMINI_API_KEY;
  }
  if (typeof CALORIQ_CONFIG !== 'undefined' && CALORIQ_CONFIG.DEFAULT_DAILY_GOAL && !localStorage.getItem(DB_KEY)) {
    state.dailyGoal = CALORIQ_CONFIG.DEFAULT_DAILY_GOAL;
  }

  state.screen = state.apiKey ? 'home' : 'setup';
}

function persistState() {
  const data = {
    dailyGoal: state.dailyGoal,
    meals: state.meals,
    lang: state.lang,
  };
  if (!hasConfigKey()) data.apiKey = state.apiKey;
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(data));
  } catch(e) {
    console.error('[Caloriq] persistState failed (storage full?):', e);
  }
}

/* ─────────────────────────────────────────────────────────
   I18N — apply translations to DOM
───────────────────────────────────────────────────────── */
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    el.innerHTML = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
  ['lang-btn', 'lang-btn-stats'].forEach(id => {
    const btn = document.getElementById(id);
    if(btn) btn.textContent = state.lang === 'en' ? 'ES' : 'EN';
  });
}

function toggleLang() {
  state.lang = state.lang === 'en' ? 'es' : 'en';
  persistState();
  applyI18n();
  if (state.screen === 'home') renderHome();
  if (state.screen === 'stats') renderStats();
}

/* ─────────────────────────────────────────────────────────
   SCREEN ROUTING
───────────────────────────────────────────────────────── */
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  document.getElementById('screen-' + name).classList.remove('hidden');
  state.screen = name;
}

function goHome() { renderHome(); showScreen('home'); }
function goCapture() {
  resetAnalyzingScreen();
  showScreen('capture');
  document.getElementById('analyze-btn').disabled = !state.currentPhoto;
}

function goStats() {
  setStatsView('day'); // Default to day view
  renderStats();
  showScreen('stats');
}


/* ─────────────────────────────────────────────────────────
   API KEY SETUP
───────────────────────────────────────────────────────── */
function saveApiKey() {
  const key = document.getElementById('api-key-input').value.trim();
  if (!key || !key.startsWith('AIza')) {
    showToast(t('apiKeyError'));
    return;
  }
  state.apiKey = key;
  persistState();
  goHome();
}

function hasConfigKey() {
  return typeof CALORIQ_CONFIG !== 'undefined' && !!CALORIQ_CONFIG.GEMINI_API_KEY;
}

/* ─────────────────────────────────────────────────────────
   DAILY HELPERS
───────────────────────────────────────────────────────── */
function todayKey() { return new Date().toISOString().slice(0, 10); }

function todayMeals() {
  const today = todayKey();
  return state.meals.filter(m => m.date === today);
}

function todayTotals() {
  return todayMeals().reduce((acc, m) => ({
    cal: acc.cal + (m.cals || 0),
    protein: acc.protein + (m.protein || 0),
    carbs: acc.carbs + (m.carbs || 0),
    fat: acc.fat + (m.fat || 0),
  }), { cal: 0, protein: 0, carbs: 0, fat: 0 });
}

/* ─────────────────────────────────────────────────────────
   RENDER HOME
───────────────────────────────────────────────────────── */
function renderHome() {
  const locale = state.lang === 'es' ? 'es-MX' : 'en-US';
  document.getElementById('strip-date').textContent =
    new Date().toLocaleDateString(locale, { weekday: 'long', month: 'long', day: 'numeric' });

  const totals = todayTotals();
  document.getElementById('strip-cal-num').textContent = Math.round(totals.cal);
  document.getElementById('strip-goal-num').textContent = state.dailyGoal;
  document.getElementById('h-protein').textContent = Math.round(totals.protein) + 'g';
  document.getElementById('h-carbs').textContent = Math.round(totals.carbs) + 'g';
  document.getElementById('h-fat').textContent = Math.round(totals.fat) + 'g';

  const pct = Math.min(100, (totals.cal / state.dailyGoal) * 100);
  const fill = document.getElementById('progress-fill');
  fill.style.width = pct + '%';
  fill.classList.toggle('over', totals.cal > state.dailyGoal);

  const list = document.getElementById('meal-list');
  const meals = todayMeals().slice().reverse();
  if (!meals.length) {
    list.innerHTML = `<div class="empty-state">
      <div class="empty-icon">🍽️</div>
      <p class="empty-text">${t('noMealsToday')}<br/>${t('tapToStart')}</p>
    </div>`;
    return;
  }

  list.innerHTML = meals.map(m => `
    <div class="meal-card">
      <div class="meal-card-inner">
        ${m.photo
          ? `<img class="meal-thumb" src="${m.photo}" alt="${escHtml(m.name)}"/>`
          : `<div class="meal-thumb" style="background:var(--surface2);display:flex;align-items:center;justify-content:center;font-size:28px">🍽️</div>`}
        <div class="meal-info">
          <div>
            <div class="meal-name">${escHtml(m.name)}</div>
            <div class="meal-time">${m.time}</div>
          </div>
          <div class="meal-cals-row">
            <span><span class="meal-cals">${Math.round(m.cals)}</span><span class="meal-kcal-label"> kcal</span></span>
            <span class="meal-macros">P ${Math.round(m.protein)}g · C ${Math.round(m.carbs)}g · F ${Math.round(m.fat)}g</span>
          </div>
        </div>
        <div class="meal-actions">
          <button class="meal-action-btn" title="${t('editMeal')}" onclick="openEditMeal('${m.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="meal-action-btn" title="${t('delete')}" onclick="askDelete('${m.id}')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────────────────────
   STATS SCREEN
───────────────────────────────────────────────────────── */
function getChartColors() {
    const style = getComputedStyle(document.body);
    return {
        accent: style.getPropertyValue('--accent'),
        text: style.getPropertyValue('--text'),
        text2: style.getPropertyValue('--text2'),
        surface: style.getPropertyValue('--surface'),
        surface2: style.getPropertyValue('--surface2'),
        border: style.getPropertyValue('--border')
    };
}

function renderStats() {
    const colors = getChartColors();

    // Destroy existing charts
    if (state.charts.daily) state.charts.daily.destroy();
    if (state.charts.trend) state.charts.trend.destroy();
    if (state.charts.macro) state.charts.macro.destroy();

    const view = state.statsView; // 'day', 'week', or 'month'

    const dailyContainer = document.getElementById('daily-calories-chart-container');
    const trendContainer = document.getElementById('monthly-trend-chart-container');

    // Daily/Weekly Bar Chart
    if (view === 'day' || view === 'week') {
        dailyContainer.style.display = 'block';
        const isDayView = view === 'day';
        const periodData = getPeriodData(isDayView ? 7 : 4, isDayView ? 'day' : 'week');
        state.charts.daily = new Chart(document.getElementById('daily-calories-chart'), {
            type: 'bar',
            data: {
                labels: periodData.labels,
                datasets: [{
                    label: t('calories'),
                    data: periodData.calories,
                    backgroundColor: colors.accent,
                    borderRadius: 4
                }]
            },
            options: {
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: (c) => `${c.dataset.label}: ${Math.round(c.raw)} kcal` } }
                },
                scales: {
                    y: { grid: { color: colors.border }, ticks: { color: colors.text2 } },
                    x: { grid: { display: false }, ticks: { color: colors.text2 } }
                }
            }
        });
    } else {
        dailyContainer.style.display = 'none';
    }

    // Trend Line Chart (shown in all views)
    trendContainer.style.display = 'block';
    let trendData;
    if (view === 'month') {
        trendData = getPeriodData(12, 'month'); // 12 months for month view
    } else {
        trendData = getPeriodData(30, 'day'); // 30 days for day/week view
    }
    state.charts.trend = new Chart(document.getElementById('monthly-trend-chart'), {
        type: 'line',
        data: {
            labels: trendData.labels,
            datasets: [{
                label: t('calories'),
                data: trendData.calories,
                borderColor: colors.accent,
                tension: 0.2,
                pointBackgroundColor: colors.accent,
            }]
        },
        options: {
            plugins: {
                legend: { display: false },
                tooltip: { callbacks: { label: (c) => `${Math.round(c.raw)} kcal` } }
            },
            scales: {
                y: { grid: { color: colors.border }, ticks: { color: colors.text2 } },
                x: { grid: { color: colors.border }, ticks: { color: colors.text2, autoSkip: true, maxTicksLimit: view === 'month' ? 12 : 10 } }
            }
        }
    });

    // Macro Doughnut Chart
    let macroPeriodDays;
    if (view === 'day') macroPeriodDays = 1;
    else if (view === 'week') macroPeriodDays = 7;
    else macroPeriodDays = 30;
    
    const macroData = getPeriodData(macroPeriodDays, 'day', true);
    const macroTotals = {
        protein: macroData.protein.reduce((a, b) => a + b, 0),
        carbs: macroData.carbs.reduce((a, b) => a + b, 0),
        fat: macroData.fat.reduce((a, b) => a + b, 0),
    };

    state.charts.macro = new Chart(document.getElementById('macro-distribution-chart'), {
        type: 'doughnut',
        data: {
            labels: [t('protein'), t('carbs'), t('fat')],
            datasets: [{
                data: [macroTotals.protein, macroTotals.carbs, macroTotals.fat],
                backgroundColor: ['#10B981', '#3B82F6', '#F59E0B'],
                borderWidth: 0,
            }]
        },
        options: {
            plugins: { 
                legend: { position: 'bottom', labels: { color: colors.text2, boxWidth: 12, padding: 20 } },
                tooltip: { callbacks: { label: (c) => `${c.label}: ${Math.round(c.raw)} g` } }
            },
            cutout: '70%'
        }
    });
}

function getPeriodData(count, unit, isMacro = false) {
    const labels = [];
    const calories = [], protein = [], carbs = [], fat = [];
    const locale = state.lang === 'es' ? 'es-MX' : 'en-US';

    for (let i = count - 1; i >= 0; i--) {
        const start = new Date();
        const end = new Date();
        let label = '';

        if (unit === 'day') {
            start.setDate(start.getDate() - i);
            end.setDate(end.getDate() - i);
            if (!isMacro) label = start.toLocaleDateString(locale, { weekday: 'short' });
        } else if (unit === 'week') {
            start.setDate(start.getDate() - (i * 7) - 6);
            end.setDate(end.getDate() - (i * 7));
            const startStr = start.toLocaleDateString(locale, { day: 'numeric' });
            const endStr = end.toLocaleDateString(locale, { month:'short', day:'numeric' });
            label = `${startStr} - ${endStr}`;
        } else { // month
            start.setMonth(start.getMonth() - i, 1);
            end.setMonth(end.getMonth() - i + 1, 0);
            label = start.toLocaleDateString(locale, { month: 'short' });
        }
        if (!isMacro) labels.push(label);

        const s1 = new Date(start.setHours(0,0,0,0));
        const e1 = new Date(end.setHours(23,59,59,999));

        const periodMeals = state.meals.filter(m => {
            const mealDate = new Date(m.date + 'T12:00:00'); // Use noon to avoid timezone issues
            return mealDate >= s1 && mealDate <= e1;
        });

        const totals = periodMeals.reduce((acc, m) => ({
            cal: acc.cal + m.cals, protein: acc.protein + m.protein,
            carbs: acc.carbs + m.carbs, fat: acc.fat + m.fat
        }), { cal: 0, protein: 0, carbs: 0, fat: 0 });
        
        calories.push(totals.cal);
        protein.push(totals.protein);
        carbs.push(totals.carbs);
        fat.push(totals.fat);
    }
    return { labels, calories, protein, carbs, fat };
}

function setStatsView(view) {
  state.statsView = view;
  document.querySelectorAll('.stats-view-selector .view-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === view);
  });
  renderStats();
}

/* ─────────────────────────────────────────────────────────
   IMAGE RESIZING (improves reliability, reduces payload)
───────────────────────────────────────────────────────── */
function resizeImage(dataUrl, maxDim = 1024) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = () => resolve(dataUrl); // fallback: use original
    img.src = dataUrl;
  });
}

/* ─────────────────────────────────────────────────────────
   PHOTO CAPTURE
───────────────────────────────────────────────────────── */
document.getElementById('file-input').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) {
    console.log('[Caloriq] file-input change: no file selected');
    return;
  }
  console.log('[Caloriq] file-input change — name:', file.name, '| type:', file.type, '| size:', file.size, 'bytes');

  const reader = new FileReader();

  reader.onloadstart = () => console.log('[Caloriq] FileReader: started reading', file.name);

  reader.onprogress = ev => {
    if (ev.lengthComputable) {
      console.log('[Caloriq] FileReader: progress', Math.round((ev.loaded / ev.total) * 100) + '%');
    }
  };

  reader.onload = async ev => {
    const dataUrl = ev.target.result;
    console.log('[Caloriq] FileReader: load complete — data URL length:', dataUrl.length);

    const resized = await resizeImage(dataUrl);
    console.log('[Caloriq] Resized data URL length:', resized.length);

    state.currentPhoto = resized;
    const img = document.getElementById('preview-img');
    img.src = state.currentPhoto;
    img.style.display = 'block';
    document.getElementById('preview-placeholder').style.display = 'none';
    document.getElementById('analyze-btn').disabled = false;
  };

  reader.onerror = () => {
    console.error('[Caloriq] FileReader: error reading file:', reader.error);
    showToast(t('failedLoadImage') + ': ' + (reader.error?.message || 'Unknown error'));
  };

  reader.onabort = () => console.warn('[Caloriq] FileReader: reading aborted');

  try {
    reader.readAsDataURL(file);
  } catch (err) {
    console.error('[Caloriq] FileReader.readAsDataURL() threw:', err);
    showToast(t('failedLoadImage') + ': ' + (err.message || 'Unknown error'));
  }
});

/* ─────────────────────────────────────────────────────────
   AI ANALYSIS
───────────────────────────────────────────────────────── */
function showAnalyzingError(msg) {
  document.getElementById('analyzing-progress').style.display = 'none';
  document.getElementById('analyzing-error-msg').textContent = msg;
  document.getElementById('analyzing-error').classList.add('visible');
}

function resetAnalyzingScreen() {
  document.getElementById('analyzing-progress').style.display = '';
  document.getElementById('analyzing-error').classList.remove('visible');
}

function buildPrompt(lang) {
  const isEs = lang === 'es';
  return isEs
    ? `Eres un nutricionista profesional con experiencia en análisis de alimentos latinoamericanos, mexicanos, españoles e internacionales.
Analiza esta foto de comida y devuelve ÚNICAMENTE JSON válido (sin markdown, sin texto adicional) con esta estructura exacta:
{
  "foodName": "Nombre descriptivo breve de la comida (máx 5 palabras, en español)",
  "totalCalories": <número entero>,
  "protein": <gramos, número entero>,
  "carbs": <gramos, número entero>,
  "fat": <gramos, número entero>,
  "confidence": "high" | "medium" | "low",
  "items": [
    { "name": "Nombre del ingrediente o elemento (en español)", "calories": <número entero> }
  ],
  "notes": "Nota breve sobre supuestos de porción o incertidumbre (en español)"
}
Instrucciones:
- Estima porciones razonables según lo que se ve en la imagen (no asumas porciones pequeñas por defecto).
- Si hay múltiples alimentos, lista cada uno por separado en "items".
- Si no puedes identificar la comida con certeza, devuelve tu mejor estimación y establece confidence a "low".
- No incluyas texto fuera del objeto JSON.`
    : `You are a professional nutritionist with expertise in analyzing diverse foods from all cuisines.
Analyze this food photo and return ONLY valid JSON (no markdown, no extra text) with this exact structure:
{
  "foodName": "Short descriptive meal name (max 5 words)",
  "totalCalories": <integer>,
  "protein": <grams, integer>,
  "carbs": <grams, integer>,
  "fat": <grams, integer>,
  "confidence": "high" | "medium" | "low",
  "items": [
    { "name": "Ingredient or component name", "calories": <integer> }
  ],
  "notes": "Brief note about portion assumptions or uncertainty"
}
Instructions:
- Estimate realistic portions based on what is visible in the image (do not default to small portions).
- If multiple foods are present, list each separately in "items".
- Account for cooking methods (fried, grilled, etc.) when estimating calories.
- If you cannot identify the food confidently, return your best estimate and set confidence to "low".
- Do not include any text outside the JSON object.`;
}

async function fallbackAnalysis(base64) {
    console.log('[Caloriq] Starting fallback analysis with Hugging Face');
    try {
        const hfApiKey = (typeof CALORIQ_CONFIG !== 'undefined' && CALORIQ_CONFIG.HF_API_KEY) ? CALORIQ_CONFIG.HF_API_KEY : '';
        if (!hfApiKey) {
            throw new Error('Hugging Face API key not configured.');
        }

        const res = await fetch('https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${hfApiKey}`,
                'Content-Type': 'application/octet-stream'
            },
            body: Uint8Array.from(atob(base64), c => c.charCodeAt(0))
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('[Caloriq] Hugging Face API error:', res.status, errorText);
            throw new Error(`Hugging Face API error: ${res.status}`);
        }

        const hfResult = await res.json();
        console.log('[Caloriq] Hugging Face response:', hfResult);

        const description = hfResult[0]?.generated_text;
        if (!description) {
            throw new Error('Could not get description from Hugging Face.');
        }

        const result = {
            foodName: description,
            totalCalories: 'Estimando...',
            protein: '...',
            carbs: '...',
            fat: '...',
            confidence: 'low',
            items: [],
            notes: 'Fallo de Gemini, usando análisis de respaldo. Ajuste los valores manualmente.'
        };
        
        state.currentResult = result;
        showResult(result);

    } catch (err) {
        console.error('[Caloriq] fallbackAnalysis() error:', err);
        showAnalyzingError(t('analysisFailed') + ': ' + (err.message || 'Hugging Face fallback failed'));
    }
}


async function analyzePhoto() {
  if (!state.currentPhoto) return;

  resetAnalyzingScreen();
  document.getElementById('analyzing-img').src = state.currentPhoto;
  showScreen('analyzing');

  const mimeMatch = state.currentPhoto.match(/^data:(image\/\w+);base64,/);
  const mimeType = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const base64 = state.currentPhoto.replace(/^data:image\/[\w+]+;base64,/, '');

  console.log('[Caloriq] analyzePhoto() start — mimeType:', mimeType, '| base64 length:', base64.length);

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${state.apiKey}`;
    console.log('[Caloriq] Sending request to Gemini API…');

    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: buildPrompt(state.lang) },
            { inlineData: { mimeType, data: base64 } }
          ]
        }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 2048 }
      })
    });

    console.log('[Caloriq] Gemini response status:', res.status);

    if (!res.ok) {
        if (res.status === 503 || res.status === 429) {
            console.warn(`[Caloriq] Gemini API responded with ${res.status}, falling back to Hugging Face`);
            return fallbackAnalysis(base64);
        }
      const errBody = await res.json().catch(jsonErr => {
        console.error('[Caloriq] Failed to parse error response JSON:', jsonErr);
        return {};
      });
      console.error('[Caloriq] Gemini API error body:', errBody);
      const errMsg = errBody?.error?.message || `HTTP ${res.status}`;
      const isQuota = res.status === 429 || errMsg.toLowerCase().includes('quota');
      if (isQuota) {
          console.warn(`[Caloriq] Gemini API quota exceeded, falling back to Hugging Face`);
          return fallbackAnalysis(base64);
      }
      throw new Error(errMsg);
    }

    const data = await res.json();
    console.log('[Caloriq] Gemini response data:', data);

    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log('[Caloriq] Raw model text:', rawText);

    const cleaned = rawText.replace(/```json|```/g, '').trim();
    let result;
    try {
      result = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error('[Caloriq] Failed to parse model JSON:', parseErr, '| cleaned text:', cleaned);
      throw new Error(t('couldNotParse'));
    }

    state.currentResult = result;
    showResult(result);

  } catch(err) {
    console.error('[Caloriq] analyzePhoto() error:', err);
    showAnalyzingError(t('analysisFailed') + ': ' + (err.message || 'Unknown error'));
  }
}

function showResult(r) {
  document.getElementById('result-img').src = state.currentPhoto;
  document.getElementById('result-food-name').textContent = r.foodName || t('yourMeal');
  
  document.getElementById('result-cals').textContent = (typeof r.totalCalories === 'number') ? Math.round(r.totalCalories) : r.totalCalories;
  document.getElementById('r-protein').textContent = (typeof r.protein === 'number') ? Math.round(r.protein) : r.protein;
  document.getElementById('r-carbs').textContent = (typeof r.carbs === 'number') ? Math.round(r.carbs) : r.carbs;
  document.getElementById('r-fat').textContent = (typeof r.fat === 'number') ? Math.round(r.fat) : r.fat;

  const conf = r.confidence || 'medium';
  const confMap = { high: t('highConf'), medium: t('medConf'), low: t('lowConf') };
  document.getElementById('confidence-text').textContent = confMap[conf] || confMap.medium;

  const itemsList = document.getElementById('items-list');
  let itemsHtml = '';
  if (r.items && r.items.length > 0) {
    itemsHtml = r.items.map(i => `
      <div class="item-row">
        <span class="item-name">${escHtml(i.name)}</span>
        <span class="item-cals">${Math.round(i.calories)} kcal</span>
      </div>
    `).join('');
  } else if (r.notes) {
      itemsHtml = `<div class="item-row"><span class="item-name" style="color:var(--text3)">${escHtml(r.notes)}</span></div>`;
  } else {
      itemsHtml = `<div class="item-row"><span class="item-name" style="color:var(--text3)">${t('noItemsDetected')}</span></div>`;
  }
  itemsList.innerHTML = itemsHtml;

  document.getElementById('edit-name').value = r.foodName || '';
  document.getElementById('edit-cals').value = (typeof r.totalCalories === 'number') ? Math.round(r.totalCalories) : '';
  document.getElementById('edit-protein').value = (typeof r.protein === 'number') ? Math.round(r.protein) : '';
  document.getElementById('edit-carbs').value = (typeof r.carbs === 'number') ? Math.round(r.carbs) : '';
  document.getElementById('edit-fat').value = (typeof r.fat === 'number') ? Math.round(r.fat) : '';

  showScreen('result');
}


/* ─────────────────────────────────────────────────────────
   SAVE MEAL
───────────────────────────────────────────────────────── */
function saveMeal() {
  const name = document.getElementById('edit-name').value.trim() || t('yourMeal');
  const cals = parseFloat(document.getElementById('edit-cals').value) || 0;
  const protein = parseFloat(document.getElementById('edit-protein').value) || 0;
  const carbs = parseFloat(document.getElementById('edit-carbs').value) || 0;
  const fat = parseFloat(document.getElementById('edit-fat').value) || 0;

  const now = new Date();
  const meal = {
    id: 'meal_' + Date.now(),
    date: now.toISOString().slice(0, 10),
    time: now.toLocaleTimeString(state.lang === 'es' ? 'es-MX' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
    name, cals, protein, carbs, fat,
    photo: state.currentPhoto,
  };

  state.meals.push(meal);
  state.currentPhoto = null;
  state.currentResult = null;

  document.getElementById('preview-img').style.display = 'none';
  document.getElementById('preview-placeholder').style.display = 'flex';
  document.getElementById('analyze-btn').disabled = true;
  document.getElementById('file-input').value = '';

  persistState();
  renderHome();
  showScreen('home');
  showToast(t('mealSaved'), true);
}

/* ─────────────────────────────────────────────────────────
   EDIT MEAL
───────────────────────────────────────────────────────── */
function openEditMeal(id) {
  const meal = state.meals.find(m => m.id === id);
  if (!meal) return;
  state.editTarget = id;

  document.getElementById('edit-meal-name').value = meal.name;
  document.getElementById('edit-meal-cals').value = Math.round(meal.cals);
  document.getElementById('edit-meal-protein').value = Math.round(meal.protein);
  document.getElementById('edit-meal-carbs').value = Math.round(meal.carbs);
  document.getElementById('edit-meal-fat').value = Math.round(meal.fat);

  document.getElementById('edit-meal-modal').classList.add('open');
}

function closeEditMeal() {
  state.editTarget = null;
  document.getElementById('edit-meal-modal').classList.remove('open');
}

function saveEditMeal() {
  const meal = state.meals.find(m => m.id === state.editTarget);
  if (!meal) { closeEditMeal(); return; }

  meal.name = document.getElementById('edit-meal-name').value.trim() || meal.name;
  meal.cals = parseFloat(document.getElementById('edit-meal-cals').value) || 0;
  meal.protein = parseFloat(document.getElementById('edit-meal-protein').value) || 0;
  meal.carbs = parseFloat(document.getElementById('edit-meal-carbs').value) || 0;
  meal.fat = parseFloat(document.getElementById('edit-meal-fat').value) || 0;

  persistState();
  renderHome();
  closeEditMeal();
  showToast(t('mealSaved'), true);
}

document.getElementById('edit-meal-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('edit-meal-modal')) closeEditMeal();
});

/* ─────────────────────────────────────────────────────────
   DELETE MEAL
───────────────────────────────────────────────────────── */
function askDelete(id) {
  state.deleteTarget = id;
  document.getElementById('delete-modal').classList.add('open');
}

function closeDeleteModal() {
  state.deleteTarget = null;
  document.getElementById('delete-modal').classList.remove('open');
}

function confirmDelete() {
  state.meals = state.meals.filter(m => m.id !== state.deleteTarget);
  persistState();
  closeDeleteModal();
  renderHome();
}

/* ─────────────────────────────────────────────────────────
   GOAL MODAL
───────────────────────────────────────────────────────── */
function openGoalModal() {
  document.getElementById('goal-input').value = state.dailyGoal;
  document.getElementById('goal-modal').classList.add('open');
}

function saveGoal() {
  const g = parseInt(document.getElementById('goal-input').value);
  if (g >= 500 && g <= 9999) {
    state.dailyGoal = g;
    persistState();
    renderHome();
    document.getElementById('goal-modal').classList.remove('open');
    showToast(t('goalUpdated') + ' ' + g + ' kcal', true);
  } else {
    showToast(t('goalError'));
  }
}

document.getElementById('goal-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('goal-modal'))
    document.getElementById('goal-modal').classList.remove('open');
});

/* ─────────────────────────────────────────────────────────
   TOAST
───────────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg, success = false) {
  const t_el = document.getElementById('toast');
  t_el.textContent = msg;
  t_el.style.color = success ? 'var(--accent)' : 'var(--danger)';
  t_el.style.background = success ? 'var(--toast-ok-bg)' : 'var(--toast-err-bg)';
  t_el.style.borderColor = success ? 'var(--toast-ok-border)' : 'var(--toast-err-border)';
  t_el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t_el.classList.remove('show'), 10000);
}

/* ─────────────────────────────────────────────────────────
   UTILS
───────────────────────────────────────────────────────── */
function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ─────────────────────────────────────────────────────────
   THEME
───────────────────────────────────────────────────────── */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  ['theme-icon-dark', 'theme-icon-dark-stats'].forEach(id => {
      const icon = document.getElementById(id);
      if (icon) icon.style.display = theme === 'dark' ? '' : 'none';
  });
  ['theme-icon-light', 'theme-icon-light-stats'].forEach(id => {
      const icon = document.getElementById(id);
      if (icon) icon.style.display = theme === 'light' ? '' : 'none';
  });
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#0f1a14' : '#f5f7f3';
}

function toggleTheme() {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  localStorage.setItem('caloriq_theme', next);
  applyTheme(next);
  if (state.screen === 'stats') {
      renderStats();
  }
}

(function initTheme() {
  const saved = localStorage.getItem('caloriq_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));
})();

/* ─────────────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────────────── */
loadState();
applyI18n();
if (state.screen === 'home') { renderHome(); }
showScreen(state.screen);


/* ─────────────────────────────────────────────────────────
   SERVICE WORKER
───────────────────────────────────────────────────────── */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
