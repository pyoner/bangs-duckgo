import fs from 'fs';
import path from 'path';

const url = 'https://duckduckgo.com/bang.js';

function saveAsJSON(filename: string, data: any) {
  const content = JSON.stringify(data, null, 2);
  fs.writeFileSync(filename, content);
  console.log(`Data saved to ${filename}`);
}

async function fetchAndSaveBangs() {
  const response = await fetch(url);
  const json = await response.json();
  const filename = path.resolve(__dirname, 'bangs.json');
  saveAsJSON(filename, json);
}

fetchAndSaveBangs();
