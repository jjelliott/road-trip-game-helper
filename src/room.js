import {LocalStorage} from "@/local-storage.js";

let _room = new LocalStorage("game-room");

export const getGameRoom = () => {
    return _room.get() ? _room.get().code : null;
};

export const setGameRoom = (room) => {
  _room.set({code:room});
};