import styled from 'styled-components';

export const Container = styled.header`
  margin-top: 74px;
  margin-bottom: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 201px;
  }
`;

export const Menu = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;

  button {
    margin: 0px 8px;
    a {
      color: #fff;
      text-decoration: none;
    }
  }
`;
