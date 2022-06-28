import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Slides } from "../redux/store/interfaces";
import { setSlide } from "../redux/store/slices/projectSlice";
import { useAppDispatch } from "../redux/store/store";
import BounceWord from "./bounceWord";
import FadeWord from "./fadeWord";

const Begin = () => {
  const dispatch = useAppDispatch();

  const changeSlide = (slide: Slides) => {
    dispatch(setSlide(slide));
  };

  return (
    <StyledBegin data-cy="load-song">
      <span>
        A fun, little tool to help you{"  "}
        <BounceWord word={"explore"} /> my music!
      </span>
      <StyledBeginWrapper data-cy="begin-wrapper">
        <p>
          Click below to get started <FadeWord word={". . ."} />
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
  padding: 3%;
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

//  --------------------------------------------------------------------------------
//  BEGIN BUTTON
export const StyledButton = styled(Button)`
  border: 0.1vw solid white;
  color: white;
  font-size: 0.7vw;

  &:hover {
    background-color: #ffffff5e;
  }
`;
