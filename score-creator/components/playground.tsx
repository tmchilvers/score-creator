import { changeSlide } from "../data/utils";
import { useAppDispatch, useAppSelector } from "../redux/store/store";
import { StyledButton } from "../styles/styles";

const Playground = () => {
  const dispatch = useAppDispatch();
  const animOpenPage = useAppSelector((state) => state.animation.openPage);
  const animClosePage = useAppSelector((state) => state.animation.closePage);

  return (
    <StyledButton
      onClick={() =>
        changeSlide(dispatch, animOpenPage, animClosePage, "begin")
      }
    >
      BACK
    </StyledButton>
  );
};

export default Playground;
