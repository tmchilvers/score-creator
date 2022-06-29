import styled from "@emotion/styled";
import { useState } from "react";
import { Slides } from "../redux/store/interfaces";
import {
  setClosePage,
  setOpenPage,
} from "../redux/store/slices/animationSlice";
import { setSlide } from "../redux/store/slices/projectSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import BounceWord from "./bounceWord";
import FadeWord from "./fadeWord";
import { StyledButton } from "./styles";
import { useEffect } from "react";

const Begin = () => {
  const animOpenPage = useAppSelector((state) => state.animation.openPage);
  const animClosePage = useAppSelector((state) => state.animation.closePage);
  const dispatch = useAppDispatch();

  const changeSlide = (slide: Slides) => {
    if (animOpenPage || animClosePage) return;
    dispatch(setClosePage(true));

    setTimeout(() => {
      dispatch(setClosePage(false));
      dispatch(setOpenPage(true));
      dispatch(setSlide(slide));
    }, 1000);
  };

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
        <StyledButton onClick={() => changeSlide("selectSong")}>
          Pick a song
        </StyledButton>
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
