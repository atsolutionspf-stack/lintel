import { useState, type FocusEvent, type FormEvent } from 'react';
import { webPacks } from '../config/packs';
import { site } from '../config/site';
import { submitRequest } from '../lib/contact';
import { SheetLabel } from './SheetLabel';

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';
type Field = 'name' | 'business' | 'email';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact({ pack, onPackChange }: { pack: string; onPackChange: (pack: string) => void }) {
  const t = site.contact;
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});

  const check = (name: Field, value: string) => {
    if (!value.trim()) return t.required;
    if (name === 'email' && !EMAIL_RE.test(value.trim())) return t.invalidEmail;
    return '';
  };

  const onBlur = (e: FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as Field;
    setErrors((prev) => ({ ...prev, [name]: check(name, e.target.value) }));
  };

  const clear = (name: Field) => errors[name] && setErrors((prev) => ({ ...prev, [name]: '' }));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const found = Object.fromEntries((['name', 'business', 'email'] as Field[]).map((f) => [f, check(f, data[f] ?? '')]));
    setErrors(found);
    const firstInvalid = (['name', 'business', 'email'] as Field[]).find((f) => found[f]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLInputElement).focus();
      return;
    }

    setStatus('sending');
    try {
      const packLabel = form.querySelector<HTMLSelectElement>('select[name="pack"]')!.selectedOptions[0].text;
      const result = await submitRequest({
        name: data.name,
        business: data.business,
        email: data.email,
        phone: data.phone ?? '',
        pack: packLabel,
        message: data.message ?? '',
      });
      setStatus(result);
      if (result === 'sent') form.reset();
    } catch {
      setStatus('error');
    }
  }

  const input = (name: Field, label: string, type = 'text', autoComplete?: string) => (
    <div className={`field${errors[name] ? ' has-error' : ''}`}>
      <label htmlFor={`f-${name}`}>{label}</label>
      <input
        id={`f-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `f-${name}-err` : undefined}
        onBlur={onBlur}
        onInput={() => clear(name)}
      />
      {errors[name] && (
        <p className="field__error" id={`f-${name}-err`}>
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <section id="contacto" className="section contact">
      <div className="container contact__grid">
        <SheetLabel n={4} />
        <header className="section-head">
          <h2>{t.title}</h2>
          <p>{t.intro}</p>
          <p className="contact__direct">
            {t.direct}
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </header>

        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="form__row">
            {input('name', t.name, 'text', 'name')}
            {input('business', t.business, 'text', 'organization')}
          </div>
          <div className="form__row">
            {input('email', t.email, 'email', 'email')}
            <div className="field">
              <label htmlFor="f-phone">
                {t.phone} <span className="field__opt">({t.optional})</span>
              </label>
              <input id="f-phone" name="phone" type="tel" autoComplete="tel" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="f-pack">{t.pack}</label>
            <select id="f-pack" name="pack" value={pack} onChange={(e) => onPackChange(e.target.value)}>
              {webPacks.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
              <option value="mantenimiento">{t.maintenancePack}</option>
              <option value="">{t.packUnsure}</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="f-message">
              {t.message} <span className="field__opt">({t.optional})</span>
            </label>
            <textarea id="f-message" name="message" rows={4} placeholder={t.messageHint} />
          </div>

          <button type="submit" className="btn btn--primary form__submit" disabled={status === 'sending'}>
            {status === 'sending' ? t.sending : t.submit}
          </button>

          <p className={`form__status form__status--${status}`} role="status">
            {status === 'sent' && t.sent}
            {status === 'mailto' && t.mailto}
            {status === 'error' && (
              <>
                {t.error} <a href={`mailto:${site.email}`}>{site.email}</a>.
              </>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
