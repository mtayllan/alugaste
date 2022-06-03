import { readFileSync } from 'fs';

export const viewMy_Stays = () => {
  const rawdata = readFileSync(new URL('./data.json', import.meta.url));
  const my_stays = JSON.parse(rawdata);
  return my_stays[0];
}