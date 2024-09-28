import type { Raw } from './gen';

export type RawBang = Omit<Raw, 'c'> & { c?: Raw['c'] | (string & {}) };

export type Bang = {
  readonly url: RawBang['u'];
  readonly bang: RawBang['t'];
  readonly site: RawBang['s'];
  readonly domain: RawBang['d'];
  readonly rating: RawBang['r'];
  readonly category?: RawBang['c'];
  readonly subcategory?: RawBang['sc'];
};
