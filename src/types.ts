import type { RawBang } from "./gen-types";

export type { RawBang } from "./gen-types";

export type Bang = {
  readonly url: RawBang["u"];
  readonly bang: RawBang["t"];
  readonly site: RawBang["s"];
  readonly domain: RawBang["d"];
  readonly rating: RawBang["r"];
  readonly category?: RawBang["c"];
  readonly subcategory?: RawBang["sc"];
};
