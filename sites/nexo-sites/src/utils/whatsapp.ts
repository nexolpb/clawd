import { SITE } from '../config/site';
import type { Locale } from '../i18n/locales';

export type WhatsAppContext =
  | { kind: 'generic' }
  | { kind: 'pricing'; plan?: 'launch' | 'presence' | 'growth' }
  | { kind: 'examples'; niche?: string }
  | { kind: 'preview' }
  | { kind: 'contact' };

export function whatsappLink(locale: Locale, ctx: WhatsAppContext = { kind: 'generic' }) {
  let msg = locale === 'es' ? SITE.whatsapp.defaultMessageEs : SITE.whatsapp.defaultMessageEn;

  if (locale === 'es') {
    if (ctx.kind === 'pricing') {
      if (ctx.plan === 'launch') msg = 'Hola, me interesa el plan Lanzamiento. ¿Qué necesitas para iniciar?';
      else if (ctx.plan === 'presence') msg = 'Hola, me interesa el plan Presencia (multi-página). ¿Qué sigue?';
      else if (ctx.plan === 'growth') msg = 'Hola, me interesa el plan Crecimiento (Ads-ready). ¿Qué incluye exactamente?';
      else msg = 'Hola, quiero elegir un plan para mi negocio. ¿Me ayudas?';
    }
    if (ctx.kind === 'examples' && ctx.niche) msg = `Hola, ¿tienes ejemplos para ${ctx.niche}?`;
    if (ctx.kind === 'preview') msg = 'Hola, quiero una vista previa gratuita de mi sitio web. Mi negocio es: '; 
    if (ctx.kind === 'contact') msg = 'Hola, quiero cotizar un sitio. Te comparto los datos por aquí.';
  } else {
    if (ctx.kind === 'pricing') {
      if (ctx.plan === 'launch') msg = 'Hi, I’m interested in the Launch plan. What do you need to get started?';
      else if (ctx.plan === 'presence') msg = 'Hi, I’m interested in the Presence plan (multi-page). What’s next?';
      else if (ctx.plan === 'growth') msg = 'Hi, I’m interested in the Growth plan (Ads-ready). What exactly is included?';
      else msg = 'Hi, I want help choosing the right plan.';
    }
    if (ctx.kind === 'examples' && ctx.niche) msg = `Hi, do you have examples for ${ctx.niche}?`;
    if (ctx.kind === 'preview') msg = 'Hi, I want a free website preview. My business name is: ';
    if (ctx.kind === 'contact') msg = 'Hi, I want a quote for a website. I can share details here.';
  }

  return `${SITE.whatsapp.waMe}?text=${encodeURIComponent(msg)}`;
}
