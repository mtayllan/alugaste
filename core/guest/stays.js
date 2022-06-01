import { readFileSync } from 'fs';

export const viewStay = () => {
  const rawdata = readFileSync(new URL('./stays.json', import.meta.url));
  const stays = JSON.parse(rawdata);
  return stays[0];
}
