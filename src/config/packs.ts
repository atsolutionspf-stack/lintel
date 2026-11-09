/**
 * Packs de creación de web y servicios adicionales.
 * Los precios se cambian una sola vez, en `prices`, y valen para los dos idiomas.
 */
import { pick } from '../i18n';

/** Precios (comunes a los dos idiomas). Sin símbolo €. */
export const prices = {
  packSimple: '390',
  packAvanzada: '590',
  packProfesional: '890',
  maintenanceHour: '30',
};

export type PackId = 'simple' | 'avanzada' | 'profesional' | 'personalizada';

export type WebPack = {
  id: PackId;
  name: string;
  /** Pago único. null = sin precio: se muestra un botón de contacto. */
  price: string | null;
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
      description: 'Una web de una sola página (One Page) con la información de tu negocio.',
      features: ['Web One Page'],
      cta: 'Solicitar información',
    },
    {
      id: 'avanzada',
      name: 'Avanzada',
      price: prices.packAvanzada,
      description: 'Tu web con reservas y pedidos online, y más ventajas para tus clientes.',
      features: ['Reservas y citas online', 'Pedidos y venta online', 'Catálogo digital', 'Base de datos'],
      cta: 'Solicitar información',
    },
    {
      id: 'profesional',
      name: 'Profesional',
      price: prices.packProfesional,
      description: 'Todo lo de Avanzada, más un panel de administración para gestionar tu negocio desde tu web.',
      features: ['Panel de administración', 'Gestión de pedidos, reservas y analíticas', 'Soporte prioritario'],
      cta: 'Solicitar información',
    },
    {
      id: 'personalizada',
      name: 'Personalizada',
      price: null,
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
      description: 'A single-page (one-page) website with your business’s information.',
      features: ['One-page website'],
      cta: 'Get information',
    },
    {
      id: 'avanzada',
      name: 'Advanced',
      price: prices.packAvanzada,
      description: 'Your website with online bookings and orders, plus extra perks for your customers.',
      features: ['Online bookings and appointments', 'Online orders and sales', 'Digital catalogue', 'Database'],
      cta: 'Get information',
    },
    {
      id: 'profesional',
      name: 'Professional',
      price: prices.packProfesional,
      description: 'Everything in Advanced, plus an admin panel to run your business from your website.',
      features: ['Admin panel', 'Order, booking and analytics management', 'Priority support'],
      cta: 'Get information',
    },
    {
      id: 'personalizada',
      name: 'Custom',
      price: null,
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
    description: 'Cambios en tu web o en tu catálogo, actualizaciones y ajustes. Se contrata por horas cuando lo necesites.',
  },
  en: {
    name: 'Maintenance hour',
    price: prices.maintenanceHour,
    unit: '/hour',
    description: 'Changes to your website or catalogue, updates and tweaks. Booked by the hour, whenever you need it.',
  },
});
