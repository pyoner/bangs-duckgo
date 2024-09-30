import * as fs from 'fs/promises';
import * as path from 'path';
import type { Bang, RawBang } from '../src/types';
import { bangFrom } from '../src';

async function convertAndSaveBangs() {
  const rawBangsPath = path.join('files', 'raw-bangs.json');
  const outputBangsPath = path.join('files', 'bangs.json');

  try {
    // Read the raw bangs JSON file
    const rawBangsData = await fs.readFile(rawBangsPath, 'utf8');
    const rawBangs: RawBang[] = JSON.parse(rawBangsData);

    // Convert RawBang objects to Bang objects
    const bangs: Bang[] = rawBangs.map(bangFrom);

    // Write the Bang objects to the output JSON file
    await fs.writeFile(outputBangsPath, JSON.stringify(bangs, null, 2), 'utf8');
    console.log(`Converted bangs have been saved to ${outputBangsPath}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

convertAndSaveBangs();
