import es from './es.json';
import en from './en.json';
import type { Locale } from './locales';

const DICT = { es, en } as const;

export type Dict = typeof es;

export function t<L extends Locale>(locale: L): Dict {
  return DICT[locale] as unknown as Dict;
}
