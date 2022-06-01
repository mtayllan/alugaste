import { readFileSync } from 'fs';

export const viewBook_Stay = () => {
  const rawdata = readFileSync(new URL('./data.json', import.meta.url));
  const book_stays = JSON.parse(rawdata);
  return book_stays[0];
}
