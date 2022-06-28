import styled from "@emotion/styled";
import Begin from "../components/begin";
import SelectSong from "../components/selectSong";
import { useAppDispatch, useAppSelector } from "../redux/store/store";

const ScoreCreator = () => {
  //  Grab initial song from Redux Project State
  const currSlide = useAppSelector((state) => state.project.currSlide);
  const dispatch = useAppDispatch();

  return (
    <StyledBackground data-cy="background-gradient">
      <StyledMain data-cy="main">
        {currSlide === "begin" ? (
          <>
            <h1>SCORE CREATOR</h1>
            <Begin />
          </>
        ) : (
          <>
            <h1>SELECT A SONG</h1>
            <SelectSong />
          </>
        )}
      </StyledMain>
    </StyledBackground>
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
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 20% 80%;
  justify-content: center;
  justify-items: center;
  align-items: center;

  font-size: 1vw;
  color: white;
  background-color: #ffffff40;
  border-radius: 20px;
  width: 70%;
  height: 90%;
`;
