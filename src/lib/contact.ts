/**
 * Envío del formulario de contacto.
 *
 * - Si `site.formEndpoint` tiene una URL, se envían los datos en JSON (POST).
 * - Si es `null`, se abre el cliente de correo del visitante con la solicitud redactada.
 */
import { site } from '../config/site';

export type ContactRequest = {
  name: string;
  restaurant: string;
  email: string;
  phone: string;
  pack: string;
  message: string;
};

export async function submitRequest(data: ContactRequest): Promise<'sent' | 'mailto'> {
  if (site.formEndpoint) {
    const res = await fetch(site.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, lang: document.documentElement.lang, source: 'webs' }),
    });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return 'sent';
  }

  const f = site.contact;
  const body = [
    `${f.name}: ${data.name}`,
    `${f.restaurant}: ${data.restaurant}`,
    `${f.email}: ${data.email}`,
    data.phone && `${f.phone}: ${data.phone}`,
    `${f.pack}: ${data.pack}`,
    data.message && `\n${f.message}:\n${data.message}`,
  ]
    .filter(Boolean)
    .join('\n');

  window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${f.mailSubject}: ${data.restaurant}`)}&body=${encodeURIComponent(body)}`;
  return 'mailto';
}
