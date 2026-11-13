import { useEffect, useRef } from 'react';

/**
 * Botón magnético: cuando el ratón se acerca, el botón se desplaza un poco hacia él.
 * Solo con ratón y si el usuario no ha pedido movimiento reducido.
 */
export function useMagnetic<T extends HTMLElement>(radius = 140, strength = 0.28) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const near = Math.hypot(dx, dy) < radius + r.width / 2;
      el.style.transform = near ? `translate(${dx * strength}px, ${dy * strength}px)` : '';
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [radius, strength]);

  return ref;
}
