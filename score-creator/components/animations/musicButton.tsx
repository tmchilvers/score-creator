import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { ENABLE_BUTTON_DELAY } from "../../data/constants";
import MusicNoteAnim from "./musicNoteAnim";
import { StyledButton } from "../../styles/styles";

const MusicButton = ({
  text,
  clickFunc,
  slide,
}: {
  text: string;
  clickFunc: any;
  slide?: string;
}) => {
  const [showAnim, setShowAnim] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDisabled(false);
    }, ENABLE_BUTTON_DELAY);
  }, []);

  return (
    <>
      <div>
        {showAnim && (
          <>
            <MusicNoteAnim transform="rotate(-90deg)" margin="-3" />
            <MusicNoteAnim transform="scaleX(-1) rotate(-90deg)" margin="9" />
          </>
        )}
        <StyledButton
          disabled={disabled}
          onClick={() => {
            clickFunc(slide);
            setShowAnim(true);
          }}
        >
          {showAnim && (
            <>
              <StyledOutline delay="" opacity="0.5" />
              <StyledOutline delay="0.35s" opacity="0.3" />
            </>
          )}
          {text}
        </StyledButton>
      </div>
    </>
  );
};

export default MusicButton;

const StyledOutline = styled.div<{
  delay: string;
  opacity: string;
}>`
  opacity: ${({ opacity }) => opacity};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  content: "";
  height: 113%;
  width: 103%;
  border: 0.1vw solid white;
  border-radius: 10px;
  animation: ${({ delay }) => `ripple 0.8s linear ${delay} forwards`};
`;
