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
