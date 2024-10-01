# Bangs-DuckGo

`bangs-duckgo` is a library designed to work with DuckDuckGo bangs. It provides utilities to handle, parse, and work with these bangs in JavaScript or TypeScript environments.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
  - [Types](#types)
    - [RawBang](#rawbang)
    - [Bang](#bang)
  - [bangs](#bangs)
  - [bangFrom](#bangfromraw-rawbang-bang)
  - [bangsFrom](#bangsfromraws-rawbang-generatorbang)
  - [parseBang](#parsebangs-string--bangquery--undefined)
  - [bangURL](#bangurlitem-rawbang--bang-query-string-string)
  - [rankedBangs](#rankedbangsbangs-bang--rawbang-arraybang--rawbang)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install this library using `npm`, `yarn`, or `bun`.

```bash
# npm
npm install bangs-duckgo

# yarn
yarn add bangs-duckgo

# bun
bun add bangs-duckgo
```

## Usage

Below is a basic example of how you can use this library:

```typescript
import bangs from 'bangs-duckgo/bangs.json';

import { parseBang, bangURL, rankedBangs } from 'bangs-duckgo';

// Get all bangs
console.log(bangs);

const bang = bangs[0];
console.log(bang);

// Parse a string to get bang and query
const parsed = parseBang('!g search query');
console.log(parsed);

// Get the URL associated with a bang
const url = bangURL(bang, 'search query');
console.log(url);

// Get ranked bangs
const ranked = rankedBangs(bangs);
console.log(ranked);
```

## API Reference

### Types

#### RawBang

`RawBang` is a type that represents a raw bang object, typically as fetched from the `bangs.json` file.

```typescript
import type { Raw } from './gen';

export type RawBang = Omit<Raw, 'c'> & { c?: Raw['c'] | (string & {}) };
```

#### Bang

`Bang` is a type that represents a formatted bang object.

```typescript
export type Bang = {
  readonly url: RawBang['u'];
  readonly bang: RawBang['t'];
  readonly name: RawBang['s'];
  readonly domain: RawBang['d'];
  readonly rating: RawBang['r'];
  readonly category?: RawBang['c'];
  readonly subcategory?: RawBang['sc'];
};
```

### import bangs

```typescript
// use this import if you prefer raw bangs
import rawBangs from 'bangs-duckgo/raw-bangs.json';

// otherwise
import bangs from 'bangs-duckgo/bangs.json';
```

### bangFrom(raw: RawBang): Bang

Converts a `RawBang` to a `Bang`.

```typescript
export function bangFrom(raw: RawBang): Bang;
```

```typescript
const formattedBang = bangFrom(rawBang);
```

### bangsFrom(raws: RawBang[]): Generator<Bang>

Generates `Bang` objects from an array of `RawBang` objects.

```typescript
export function* bangsFrom(raws: RawBang[]): Generator<Bang>;
```

```typescript
for (const bang of bangsFrom(rawBangs)) {
  console.log(bang);
}
```

### parseBang(s: string): { bang: string; query: string } | undefined

Parses a string to extract a bang and its associated query.

```typescript
export function parseBang(
  s: string,
): { bang: string; query: string } | undefined;
```

```typescript
const parsed = parseBang('!g search query');
if (parsed) {
  console.log(parsed.bang); // 'g'
  console.log(parsed.query); // 'search query'
}
```

### bangURL(item: RawBang | Bang, query: string): string

Generates the URL for a specific bang with the given query.

```typescript
export function bangURL(item: RawBang | Bang, query: string): string;
```

```typescript
const url = bangURL(formattedBang, 'search query');
console.log(url);
```

### rankedBangs(bangs: Bang[]): Bang[]

### rankedBangs(bangs: RawBang[]): RawBang[]

Sorts bangs based on their ratings in descending order.

```typescript
export function rankedBangs(bangs: Bang[]): Bang[];
export function rankedBangs(bangs: RawBang[]): RawBang[];
export function rankedBangs(
  bangs: Array<Bang | RawBang>,
): Array<Bang | RawBang>;
```

```typescript
const ranked = rankedBangs(bangs);
console.log(ranked);
```

## Scripts

- `build`: Build the project using `tsup`.
- `check-exports`: Check the exports of the project using `attw`.
- `check-format`: Check the code formatting using `prettier`.
- `fetch`: Fetch and update the `bangs.json` file.
- `format`: Format the code using `prettier`.
- `types`: Generate TypeScript types from `bangs.json`.

## Contributing

Contributions are welcome! Please visit our [issues page](https://github.com/pyoner/bangs-duckgo/issues) to report bugs or request features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
