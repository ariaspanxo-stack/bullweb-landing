/**
 * #228 — FASE 3: MEDICIÓN ARMADA SIN ACTIVAR.
 *
 * GATE DE PRIVACIDAD (documentado en el ADN #228): los IDs reales NO se
 * cargan hasta que la política de cookies/privacidad cubra Meta Pixel
 * explícitamente. HOY Cookies.tsx solo lista Google Analytics y declara
 * "NO utilizamos cookies de marketing" — activar Pixel sin actualizar esa
 * página sería mentir al visitante.
 *
 * Mientras PIXEL_ID/GA4_ID valgan 'PENDING', track() es no-op con
 * console.debug y <MeasurementScripts /> no inyecta NADA.
 */

// ===== PLACEHOLDERS — reemplazar por IDs reales al activar (ventana + gate) =====
export const PIXEL_ID = 'PENDING' as string; // Meta Pixel ID, formato: '1234567890'
export const GA4_ID   = 'PENDING' as string; // GA4 Measurement ID, formato: 'G-XXXXXXXXXX'

export const measurementActive = PIXEL_ID !== 'PENDING' || GA4_ID !== 'PENDING';

/** Nombres de evento FIJOS (runbook de activación — no renombrar): */
export type MeasurementEvent =
  | 'cta_click'
  | 'whatsapp_click'
  | 'begin_registration'
  | 'complete_registration'
  | 'plan_selected';

/**
 * track() — envía el evento a TODAS las plataformas activas.
 * Con IDs pendientes: no-op + console.debug (cero red, cero cookies).
 */
export function track(event: MeasurementEvent, params: Record<string, unknown> = {}): void {
  if (!measurementActive) {
    console.debug(`[measurement:inactiva] ${event}`, params);
    return;
  }
  if (typeof window === 'undefined') return;

  // Meta Pixel
  if (PIXEL_ID !== 'PENDING' && typeof (window as any).fbq === 'function') {
    (window as any).fbq('track', event, params);
  }
  // GA4 (gtag)
  if (GA4_ID !== 'PENDING' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', event, params);
  }
}

/** page_view estándar de GA4 (disparado por <MeasurementScripts /> al montar). */
export function trackPageView(path?: string): void {
  if (!measurementActive || typeof window === 'undefined') return;
  if (GA4_ID !== 'PENDING' && typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', 'page_view', path ? { page_path: path } : undefined);
  }
}

// ===== UTMs estándar para los CTAs de la landing =====

/** ?utm_source=landing&utm_medium=cta&utm_campaign=organico */
export function utmRegister(): string {
  return '?utm_source=landing&utm_medium=cta&utm_campaign=organico';
}

/** UTM para WhatsApp: ?utm_source=landing&utm_medium=whatsapp&utm_campaign=organico */
export function utmWhatsapp(): string {
  return '?utm_source=landing&utm_medium=whatsapp&utm_campaign=organico';
}

/** URL de registro con UTM estándar (#228: los 6 CTAs de la landing). */
export const REGISTER_URL = `https://app.bullwebchile.com/register${utmRegister()}`;
