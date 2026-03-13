export default async (request: Request) => {
  const url = new URL(request.url);

  // Only redirect on the root path.
  if (url.pathname !== '/') {
    return fetch(request);
  }

  const acceptLanguage = request.headers.get('accept-language') || '';
  const preferred = acceptLanguage.toLowerCase();

  // Simple ES vs EN detection. Defaults to ES if unclear.
  const isSpanish = preferred.includes('es');
  const target = isSpanish ? '/es/' : '/en/';

  return Response.redirect(new URL(target, url.origin).toString(), 302);
};
