import { songData } from "./constants";

type songNamesIds = {
  [songName: string]: number;
};
export const getSongNamesAndIds = () => {
  const songNamesIds: songNamesIds = {};
  songData.map((song) => (songNamesIds[song.songName] = song.songId));
  return songNamesIds;
};
