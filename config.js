/**
 * ╔══════════════════════════════════════════════════════╗
 * ║  CALORIQ — CONFIGURATION FILE                       ║
 * ║  ⚠️  SECURITY: Add this file to .gitignore           ║
 * ║  ⚠️  NEVER commit this file to any repository        ║
 * ║  ⚠️  NEVER deploy this file to a public CDN          ║
 * ╚══════════════════════════════════════════════════════╝
 *
 * For production:
 *   Replace this file with a server-side proxy endpoint
 *   (Cloudflare Worker, Netlify Function, etc.) so the
 *   key never reaches the client at all.
 *
 * Get a free Gemini API key at:
 *   https://aistudio.google.com/apikey
 */

const CALORIQ_CONFIG = {
  // Paste your Gemini API key here ↓
  GEMINI_API_KEY: 'test',

  // Model to use (flash-lite = fastest + most free-tier friendly)
  GEMINI_MODEL: 'gemini-2.0-flash-lite',

  // Daily calorie goal default
  DEFAULT_DAILY_GOAL: 2000,
};
