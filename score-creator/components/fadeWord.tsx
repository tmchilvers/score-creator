import styled from "@emotion/styled";
import { CSSProperties } from "react";

const FadeWord = ({ word }: { word: string }) => {
  const animateWord = () => {
    return word.split("").map((char, index) => {
      const style: CSSProperties = {
        animationDelay: `${0.1 + index / 10}s`,
      };

      return (
        <span aria-hidden="true" key={index} style={style}>
          {char}
        </span>
      );
    });
  };

  return <StyledFadeWord loop={true}>{animateWord()}</StyledFadeWord>;
};

export default FadeWord;

//  --------------------------------------------------------------------------------
//  SELECT ANIMATE WORD
const StyledFadeWord = styled.span<{ loop: boolean }>`
  span {
    position: relative;
    font-weight: bold;
    color: white;
    opacity: 0.5;
    animation: fade-text 3s forwards;
    animation-iteration-count: infinite;
  }

  @keyframes fade-text {
    0% {
      opacity: 0.5;
    }

    50% {
      opacity: 1;
    }

    100% {
      opacity: 0.5;
    }
  }
`;
