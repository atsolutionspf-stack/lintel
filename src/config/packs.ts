/**
 * Packs de creación de web, servicios adicionales y planes del TPV.
 * Los precios se cambian una sola vez, en `prices`, y valen para los dos idiomas.
 */
import { pick } from '../i18n';

/** Precios (comunes a los dos idiomas). Sin símbolo €. */
export const prices = {
  packSimple: '390',
  packAvanzada: '590',
  packProfesional: '890',
  /** Plan más barato del TPV, para el "desde X €/mes" del pack Profesional. */
  tpvFrom: '15',
  maintenanceHour: '30',
};

export type PackId = 'simple' | 'avanzada' | 'profesional' | 'personalizada';

export type WebPack = {
  id: PackId;
  name: string;
  /** Pago único. null = sin precio: se muestra un botón de contacto. */
  price: string | null;
  /** true = además del pago único lleva la suscripción mensual del TPV. */
  includesTpv: boolean;
  description: string;
  features: string[];
  cta: string;
};

export const webPacks: WebPack[] = pick({
  es: [
    {
      id: 'simple',
      name: 'Simple',
      price: prices.packSimple,
      includesTpv: false,
      description: 'Una web de una sola página (One Page) con la información de tu restaurante.',
      features: ['Web One Page'],
      cta: 'Solicitar información',
    },
    {
      id: 'avanzada',
      name: 'Avanzada',
      price: prices.packAvanzada,
      includesTpv: false,
      description: 'Tu web con reservas y pedidos online, y más ventajas para tus clientes.',
      features: ['Reservas online', 'Pedidos online', 'Carta digital'],
      cta: 'Solicitar información',
    },
    {
      id: 'profesional',
      name: 'Profesional',
      price: prices.packProfesional,
      includesTpv: true,
      description: 'Tu web con el TPV EasyHost y el CRM completos, todo conectado.',
      features: ['TPV EasyHost conectado a tu web', 'CRM completo', 'Soporte prioritario'],
      cta: 'Solicitar información',
    },
    {
      id: 'personalizada',
      name: 'Personalizada',
      price: null,
      includesTpv: false,
      description: 'Para proyectos con necesidades propias. Cuéntanos qué necesitas y te preparamos un presupuesto.',
      features: [],
      cta: 'Pedir presupuesto',
    },
  ],
  en: [
    {
      id: 'simple',
      name: 'Simple',
      price: prices.packSimple,
      includesTpv: false,
      description: 'A single-page (one-page) website with your restaurant’s information.',
      features: ['One-page website'],
      cta: 'Get information',
    },
    {
      id: 'avanzada',
      name: 'Advanced',
      price: prices.packAvanzada,
      includesTpv: false,
      description: 'Your website with online bookings and orders, plus extra perks for your customers.',
      features: ['Online bookings', 'Online orders', 'Digital menu'],
      cta: 'Get information',
    },
    {
      id: 'profesional',
      name: 'Professional',
      price: prices.packProfesional,
      includesTpv: true,
      description: 'Your website with the full EasyHost POS and CRM, all connected.',
      features: ['EasyHost POS connected to your website', 'Full CRM', 'Priority support'],
      cta: 'Get information',
    },
    {
      id: 'personalizada',
      name: 'Custom',
      price: null,
      includesTpv: false,
      description: 'For projects with their own requirements. Tell us what you need and we’ll prepare a quote.',
      features: [],
      cta: 'Request a quote',
    },
  ],
});

export const maintenance = pick({
  es: {
    name: 'Hora de mantenimiento',
    price: prices.maintenanceHour,
    unit: '/hora',
    description: 'Cambios en tu web o en tu carta, actualizaciones y ajustes. Se contrata por horas cuando lo necesites.',
  },
  en: {
    name: 'Maintenance hour',
    price: prices.maintenanceHour,
    unit: '/hour',
    description: 'Changes to your website or menu, updates and tweaks. Booked by the hour, whenever you need it.',
  },
});

/** Planes del TPV: la suscripción mensual que se suma al pack Profesional. */
export const tpvPlans = pick({
  es: [
    { name: 'Básico', price: '15', includes: 'TPV, plano de salas, reservas, comandero, cierre diario' },
    {
      name: 'Profesional',
      price: '25',
      includes: 'Todo lo del Básico, más KDS de cocina, modo offline, Verifactu, analítica básica, pedidos online y comandero QR',
    },
    { name: 'Premium', price: '30', includes: 'Todo lo del Profesional, más multi-restaurante, control de stock, CRM y analítica completa' },
  ],
  en: [
    { name: 'Basic', price: '15', includes: 'POS, floor plan, bookings, order taking, end-of-day close' },
    {
      name: 'Professional',
      price: '25',
      includes: 'Everything in Basic, plus kitchen display, offline mode, Verifactu, basic analytics, online orders and QR ordering',
    },
    { name: 'Premium', price: '30', includes: 'Everything in Professional, plus multi-site, stock control, CRM and full analytics' },
  ],
});
