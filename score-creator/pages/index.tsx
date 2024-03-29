import styled from "@emotion/styled";
import Head from "next/head";
import { useEffect, useState } from "react";
import Begin from "../components/begin";
import MusicWaveAnim from "../components/animations/musicWaveAnim";
import SelectSong from "../components/selectSong";
import { CHANGE_PAGE_DELAY, START_UP_DELAY } from "../data/constants";
import { setOpenPage } from "../redux/store/slices/animationSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import Playground from "../components/playground";

const ScoreCreator = () => {
  const dispatch = useAppDispatch();
  const [appStart, setAppStart] = useState(false);

  //  Grab initial song from Redux Project State
  const currSlide = useAppSelector((state) => state.project.currSlide);
  const animOpenPage = useAppSelector((state) => state.animation.openPage);
  const animClosePage = useAppSelector((state) => state.animation.closePage);

  useEffect(() => {
    setTimeout(() => {
      setAppStart(true);
      dispatch(setOpenPage(true));
    }, START_UP_DELAY);
  }, []);

  useEffect(() => {
    if (animOpenPage) {
      setTimeout(() => {
        dispatch(setOpenPage(false));
      }, CHANGE_PAGE_DELAY);
    }
  }, [animOpenPage]);

  return (
    <>
      <Head>
        <title>Score Creator</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href={`https://fonts.googleapis.com/css2?family=Raleway:wght@900&display=swap`}
          rel="stylesheet"
        />
      </Head>
      <StyledBackground data-cy="background-gradient">
        <StyledMain data-cy="main">
          {!appStart ? (
            <MusicWaveAnim />
          ) : currSlide === "begin" ? (
            <StyledContentWrapper
              data-cy="content-wrapper"
              className={
                animOpenPage ? "fadeIn" : animClosePage ? "fadeOut" : ""
              }
            >
              <h1>SCORE CREATOR</h1>
              <Begin />
            </StyledContentWrapper>
          ) : currSlide === "selectSong" ? (
            <StyledContentWrapper
              className={
                animOpenPage ? "fadeIn" : animClosePage ? "fadeOut" : ""
              }
              data-cy="content-wrapper"
            >
              <h1>SELECT A SONG</h1>
              <SelectSong />
            </StyledContentWrapper>
          ) : currSlide === "playground" ? (
            <StyledContentWrapper
              className={
                animOpenPage ? "fadeIn" : animClosePage ? "fadeOut" : ""
              }
              data-cy="content-wrapper"
            >
              <h1>CREATE A SCORE</h1>
              <Playground />
            </StyledContentWrapper>
          ) : (
            <></>
          )}
        </StyledMain>
      </StyledBackground>
    </>
  );
};

export default ScoreCreator;

//  --------------------------------------------------------------------------------
//  BACKGROUND GRADIENT
const StyledBackground = styled.div`
  padding: 2%;
  display: flex;
  justify-content: center;
  height: 100vh;

  //  GRADIENT COLOR
  background: rgb(255, 130, 255);
  background: linear-gradient(
    186deg,
    rgba(255, 130, 255, 1) 0%,
    rgba(254, 138, 115, 1) 46%,
    rgba(255, 212, 103, 1) 100%
  );

  //  GRADIENT ANIMATION
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

//  --------------------------------------------------------------------------------
//  MAIN
const StyledMain = styled.div`
  .stopped {
    animation: none;
  }

  h1 {
    font-weight: 900;
    font-size: 3vw;
  }

  font-family: "Raleway", sans-serif;
  font-size: 1.2vw;
  color: white;
  background-color: #ffffff40;
  border-radius: 20px;
  width: 5vw;
  height: 5vw;
  align-self: center;

  box-shadow: 10px 10px 20px 20px #ff717121, 10px 10px 14px 5px #ff7b7b59,
    0 0 0 #ffffff63 inset, 0 0 0 #ffffff6b inset;

  animation: open 4s cubic-bezier(0.16, 1, 0.3, 1) 1s;
  -webkit-animation-fill-mode: forwards; /* Chrome 16+, Safari 4+ */
  -moz-animation-fill-mode: forwards; /* FF 5+ */
  -o-animation-fill-mode: forwards; /* Not implemented yet */
  -ms-animation-fill-mode: forwards; /* IE 10+ */
  animation-fill-mode: forwards; /* When the spec is finished */

  @keyframes open {
    0% {
      width: 5vw;
      height: 5vw;
    }

    35% {
      width: 5vw;
      height: 5vw;
    }

    50% {
      width: 5vw;
      height: 90vh;
    }

    100% {
      width: 70vw;
      height: 90vh;
    }
  }
`;

//  --------------------------------------------------------------------------------
//  CONTENT WRAPPER
const StyledContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 20% 80%;
  justify-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  bottom: 0;
`;
