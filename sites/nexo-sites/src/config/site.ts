export const SITE = {
  name: 'Nexo Sites',
  byline: 'by Nexo Digital Ops',
  parentUrl: 'https://nexodigitalops.com',
  baseUrl: 'https://sites.nexodigitalops.com',
  whatsapp: {
    phoneE164: '+50689939071',
    waMe: 'https://wa.me/50689939071',
    defaultMessageEs: 'Hola, quiero información sobre Nexo Sites',
    defaultMessageEn: 'Hi, I want more information about Nexo Sites',
  },
  // Calendly is optional. If you don’t want to use it yet, keep this as a placeholder.
  // The CTA component will fall back to the Contact page when it detects the placeholder.
  calendlyUrl: 'https://calendly.com/your-link',
  email: 'hola@nexodigitalops.com',
  minResponseTime: {
    es: 'Respondemos en menos de 2 horas',
    en: 'We respond in under 2 hours',
  },
} as const;
