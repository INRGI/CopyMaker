import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  height: 380px;
  width: 100%;
  max-width: 300px;
  border-radius: 16px;
  box-shadow: 0 30px 30px -25px rgba(65, 51, 183, 0.25);
  background-color: #fff;
  overflow-y: auto;
  margin-left: 30px;
  padding-top: 20px;
`;
export const Title = styled.p`
    font-size: 25px;
    font-weight: bold;
    margin: 0;
`;