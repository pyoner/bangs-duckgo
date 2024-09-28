import type { Bang, RawBang } from "./types";

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
