import styled, { css } from 'styled-components';

export default styled.input`
  padding: 0 16px;
  width: 100%;
  height: 52px;
  background: #fff;
  border: 2px solid #fff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  outline: none;
  font-size: 16px;
  transition: border-color 0.2s ease-in;
  appearence: none;

  &:focus  {
    border-color: ${({ theme }) => theme.colors.primary.main};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `}
`;
