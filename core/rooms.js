import { readFileSync } from 'fs';

export const getRooms = () => {
  const rawdata = readFileSync(new URL('./rooms/data.json', import.meta.url));
  const rooms = JSON.parse(rawdata);
  return rooms;
}

export const getRoom = (id) => {
  const rawdata = readFileSync(new URL('./rooms/room.json', import.meta.url));
  const rooms = JSON.parse(rawdata);
  return rooms.find(data => data.id == id);;
}