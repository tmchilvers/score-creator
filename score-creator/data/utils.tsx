import { Slides } from "../redux/store/interfaces";
import {
  setClosePage,
  setOpenPage,
} from "../redux/store/slices/animationSlice";
import { setSlide } from "../redux/store/slices/projectSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import {
  CHANGE_PAGE_DELAY,
  SONG_DATA,
  START_PAGE_CHANGE_DELAY,
} from "./constants";

type songNamesIds = {
  [songName: string]: number;
};

export const getSongNamesAndIds = () => {
  const songNamesIds: songNamesIds = {};
  SONG_DATA.map((song) => (songNamesIds[song.songName] = song.songId));
  return songNamesIds;
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const changeSlide = (
  dispatch: any,
  animOpenPage: boolean,
  animClosePage: boolean,
  slide: Slides
) => {
  if (animOpenPage || animClosePage) return;
  setTimeout(() => {
    dispatch(setClosePage(true));

    setTimeout(() => {
      dispatch(setClosePage(false));
      dispatch(setOpenPage(true));
      dispatch(setSlide(slide));
    }, CHANGE_PAGE_DELAY);
  }, START_PAGE_CHANGE_DELAY);
};
