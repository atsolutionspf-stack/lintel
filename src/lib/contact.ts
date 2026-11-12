/**
 * Envío del formulario de contacto.
 *
 * - Si `site.formEndpoint` tiene una URL, se envían los datos en JSON (POST) y nos llega un correo.
 * - Si es `null`, se abre el cliente de correo del visitante con la solicitud redactada.
 */
import { site } from '../config/site';

export type ContactRequest = {
  name: string;
  business: string;
  email: string;
  phone: string;
  pack: string;
  message: string;
};

export async function submitRequest(data: ContactRequest): Promise<'sent' | 'mailto'> {
  const f = site.contact;

  if (site.formEndpoint) {
    // El correo llega con los nombres de los campos en el idioma de la página.
    const res = await fetch(site.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `${f.mailSubject}: ${data.business}`,
        _template: 'table',
        [f.name]: data.name,
        [f.business]: data.business,
        email: data.email,
        [f.phone]: data.phone || '—',
        [f.pack]: data.pack,
        [f.message]: data.message || '—',
        lang: document.documentElement.lang,
      }),
    });
    const json = await res.json().catch(() => null);
    // FormSubmit responde 200 con success "false" si aún no está activado.
    if (!res.ok || !json || String(json.success) !== 'true') throw new Error(json?.message || `Error ${res.status}`);
    return 'sent';
  }

  const body = [
    `${f.name}: ${data.name}`,
    `${f.business}: ${data.business}`,
    `${f.email}: ${data.email}`,
    data.phone && `${f.phone}: ${data.phone}`,
    `${f.pack}: ${data.pack}`,
    data.message && `\n${f.message}:\n${data.message}`,
  ]
    .filter(Boolean)
    .join('\n');

  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${f.mailSubject}: ${data.business}`)}&body=${encodeURIComponent(body)}`;
  return 'mailto';
}
