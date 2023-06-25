import styled from 'styled-components';

export const Container = styled.div`
padding: 16px;
background: #fff;
border-radius: 4px;
box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.04);
display: flex;
align-items: center;
justify-content: space-between;

& + & {
  margin-top: 16px;
}

.category-title {
  display: flex;
  align-items: center;
}

span {
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray[200]};
  display: block;
}

.actions {
  display: flex;
  align-items: center;

  button {
    background: transparent;
    border: none;
    margin-left: 8px;
  }
}
`;
