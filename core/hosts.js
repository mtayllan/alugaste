import { readFileSync } from 'fs';

export const getHost = (id, req) => {
  if (id) {
    const rawdata = readFileSync(new URL('./hosts/data.json', import.meta.url));
    const hosts = JSON.parse(rawdata);
  
    return hosts.find(data => data.id == id);
  } else if (req.currentHost) {
    return req.currentHost
  }
}
