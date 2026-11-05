import { site } from '../config/site';

export const SHEETS = 4;

/** Rótulo de lámina en la esquina de cada sección: "Lámina 02 / 04". */
export function SheetLabel({ n }: { n: number }) {
  return (
    <p className="sheet-label" aria-hidden="true">
      {site.sheet} {String(n).padStart(2, '0')} / {String(SHEETS).padStart(2, '0')}
    </p>
  );
}
