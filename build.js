const fs = require('fs');

const key = process.env.GEMINI_API_KEY || '';

fs.writeFileSync('config.js',
  `const CALORIQ_CONFIG = {\n` +
  `  GEMINI_API_KEY: '${key}',\n` +
  `  GEMINI_MODEL: 'gemini-2.0-flash-lite',\n` +
  `  DEFAULT_DAILY_GOAL: 2000,\n` +
  `};\n`
);

console.log('config.js generated' + (key ? ' with API key' : ' WITHOUT API key (GEMINI_API_KEY not set)'));
