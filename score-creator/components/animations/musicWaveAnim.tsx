import styled from "@emotion/styled";

const MusicWaveAnim = () => {
  return (
    <StyledMusicWave
      type="image/svg+xml"
      data="/svgs/MusicWave.svg"
    ></StyledMusicWave>
  );
};

export default MusicWaveAnim;

const StyledMusicWave = styled.object`
  animation: disappear 0.2s linear 2.1s forwards;

  @keyframes disappear {
    0% {
      opacity: 1;
    }

    99% {
      width: auto;
      height: auto;
    }

    100% {
      opacity: 0;
      width: 0;
      height: 0;
    }
  }
`;
