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
  /** Plazo de entrega (confirmado por AT Solutions). */
  delivery: string;
  cta: string;
};

/** Pack destacado como «Recomendado» en el selector, la ficha y la comparativa. */
export const recommendedPack: PackId = 'avanzada';

export const webPacks: WebPack[] = pick({
  es: [
    {
      id: 'simple',
      name: 'Simple',
      price: prices.packSimple,
      description: 'Una web de una sola página (One Page) con la información de tu negocio.',
      features: ['Web One Page'],
      delivery: 'hasta 48 h',
      cta: 'Solicitar información',
    },
    {
      id: 'avanzada',
      name: 'Avanzada',
      price: prices.packAvanzada,
      description: 'Tu web con reservas y pedidos online, y catálogo digital.',
      features: ['Reservas y citas online', 'Pedidos y venta online', 'Catálogo digital'],
      delivery: 'hasta 7 días',
      cta: 'Solicitar información',
    },
    {
      id: 'profesional',
      name: 'Profesional',
      price: prices.packProfesional,
      description: 'Todo lo de Avanzada, más una base de datos con tus clientes y pedidos y un panel de administración para gestionar tu negocio desde tu web.',
      features: ['Base de datos', 'Panel de administración', 'Gestión de pedidos, reservas y analíticas'],
      delivery: 'hasta 12 días',
      cta: 'Solicitar información',
    },
    {
      id: 'personalizada',
      name: 'Personalizada',
      price: null,
      description: 'Para proyectos con necesidades propias. Cuéntanos qué necesitas y te preparamos un presupuesto.',
      features: [],
      delivery: 'según el proyecto',
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
      delivery: 'up to 48 h',
      cta: 'Get information',
    },
    {
      id: 'avanzada',
      name: 'Advanced',
      price: prices.packAvanzada,
      description: 'Your website with online bookings and orders, and a digital catalogue.',
      features: ['Online bookings and appointments', 'Online orders and sales', 'Digital catalogue'],
      delivery: 'up to 7 days',
      cta: 'Get information',
    },
    {
      id: 'profesional',
      name: 'Professional',
      price: prices.packProfesional,
      description: 'Everything in Advanced, plus a database of your customers and orders and an admin panel to run your business from your website.',
      features: ['Database', 'Admin panel', 'Order, booking and analytics management'],
      delivery: 'up to 12 days',
      cta: 'Get information',
    },
    {
      id: 'personalizada',
      name: 'Custom',
      price: null,
      description: 'For projects with their own requirements. Tell us what you need and we’ll prepare a quote.',
      features: [],
      delivery: 'depends on the project',
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

/** Comparativa: 1 = incluido, 0 = no incluido, 2 = a medida. Columnas: Simple, Avanzada, Profesional, Personalizada. */
export const compareMatrix = [
  [1, 1, 1, 2],
  [0, 1, 1, 2],
  [0, 1, 1, 2],
  [0, 1, 1, 2],
  [0, 0, 1, 2],
  [0, 0, 1, 2],
  [0, 0, 1, 2],
];
