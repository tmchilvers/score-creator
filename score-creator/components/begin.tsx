import styled from "@emotion/styled";
import { CHANGE_PAGE_DELAY, START_PAGE_CHANGE_DELAY } from "../data/constants";
import { changeSlide } from "../data/utils";
import { Slides } from "../redux/store/interfaces";
import {
  setClosePage,
  setOpenPage,
} from "../redux/store/slices/animationSlice";
import { setSlide } from "../redux/store/slices/projectSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import BounceWord from "./animations/bounceWord";
import FadeWord from "./animations/fadeWord";
import MusicButton from "./animations/musicButton";

const Begin = () => {
  const dispatch = useAppDispatch();
  const animOpenPage = useAppSelector((state) => state.animation.openPage);
  const animClosePage = useAppSelector((state) => state.animation.closePage);

  return (
    <StyledBegin data-cy="begin">
      <span>
        A fun, and easy tool to help you{"  "}
        <BounceWord word={"explore"} /> my music!
      </span>
      <StyledBeginWrapper data-cy="begin-wrapper">
        <p>
          <FadeWord word={"click below to begin . . ."} />
        </p>
        <MusicButton
          text={"Pick a Song"}
          clickFunc={changeSlide}
          dispatch={dispatch}
          animOpenPage={animOpenPage}
          animClosePage={animClosePage}
          slide="selectSong"
        />
      </StyledBeginWrapper>
    </StyledBegin>
  );
};

export default Begin;

//  --------------------------------------------------------------------------------
//  SELECT SONG
const StyledBegin = styled.div`
  padding: 0 3%;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 30% 70%;
  justify-items: center;
`;

//  --------------------------------------------------------------------------------
//  BEGIN WRAPPER
const StyledBeginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
