import styled from "@emotion/styled";
import { CSSProperties } from "react";

const BounceWord = ({ word }: { word: string }) => {
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

  return <StyledAnimateWord loop={true}>{animateWord()}</StyledAnimateWord>;
};

export default BounceWord;

//  --------------------------------------------------------------------------------
//  SELECT ANIMATE WORD
const StyledAnimateWord = styled.span<{ loop: boolean }>`
  span {
    position: relative;
    font-weight: bold;
    color: white;
    bottom: -1em;
    opacity: 0;
    animation: move-text 3s forwards;
    animation-iteration-count: infinite;
  }

  @keyframes move-text {
    0% {
      bottom: -0.2em;
      opacity: 1;
    }

    6% {
      bottom: 0.2em;
    }

    10% {
      bottom: 0;
      opacity: 1;
    }

    90% {
      bottom: 0;
      opacity: 1;
    }

    100% {
      bottom: -0.2em;
      opacity: 0;
    }
  }
`;
