import type { Bang, RawBang } from './types';

export function bangFrom(raw: RawBang): Bang {
  return {
    url: raw.u,
    bang: raw.t,
    site: raw.s,
    domain: raw.d,
    rating: raw.r,
    category: raw.c,
    subcategory: raw.sc,
  };
}

export function* bangsFrom(raws: RawBang[]): Generator<Bang> {
  for (const raw of raws) {
    yield bangFrom(raw);
  }
}

export const RE_BANG = /^\s*\!(\w+)(?:\s+|$)(.*)/;
export function parseBang(
  s: string,
): { bang: string; query: string } | undefined {
  const m = RE_BANG.exec(s);
  if (!m) {
    return;
  }

  const [_, bang, query] = m;
  return { bang, query };
}

export function bangURL(item: RawBang | Bang, query: string): string {
  const url = 'url' in item ? item.url : item.u;
  return url.replace('{{{s}}}', encodeURIComponent(query));
}

export function rankedBangs(bangs: Bang[]): Bang[];
export function rankedBangs(bangs: RawBang[]): RawBang[];
export function rankedBangs(
  bangs: Array<Bang | RawBang>,
): Array<Bang | RawBang> {
  return bangs.sort((a, b) => {
    const ratingA = 'rating' in a ? a.rating : a.r;
    const ratingB = 'rating' in b ? b.rating : b.r;
    return ratingB - ratingA;
  });
}
