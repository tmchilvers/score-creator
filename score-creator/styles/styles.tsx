import { Button, styled } from "@mui/material";

//  --------------------------------------------------------------------------------
//  BEGIN BUTTON
export const StyledButton = styled(Button)`
  border: 0.1vw solid white;
  border-radius: 10px;
  color: white;
  font-size: 1vw;
  width: 9vw;

  &:disabled,
  &[disabled] {
    color: white;
  }

  &:hover {
    border: 0.1vw solid white;
    background-color: #ffffff5e;
  }
`;
