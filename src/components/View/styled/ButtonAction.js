import styled from "styled-components";
import theme from "../../styled/defaultTheme";

const ButtonAction = styled.button`
  background-color: ${theme.colors.background};
  color: ${theme.colors.primaryTextColor};
  border: none;
  padding: ${theme.spacings.sm} ${theme.spacings.md};
  border-radius: 5px;
  cursor: pointer;
  font-size: ${theme.textSizes.sm};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${theme.colors.primary};
  }

  &:disabled {
    background-color: ${theme.colors.secondaryBackground};
    cursor: not-allowed;
  }
`;

export default ButtonAction;
