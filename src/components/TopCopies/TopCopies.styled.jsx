import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  height: 380px;
  width: 100%;
  max-width: 180px;
  border-radius: 16px;
  box-shadow: 0 30px 30px -25px rgba(65, 51, 183, 0.25);
  background-color: #fff;
  overflow-y: auto;
  margin-left: 30px;
  padding-top: 20px;
`;
export const Title = styled.p`
    font-size: 24px;
    font-weight: bold;
    margin: 0;
`;

export const List = styled.ul`
  list-style: none;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 90%;
    padding: 0;
`;

export const Item = styled.li`
    display: flex;
    justify-content: space-between;
    font-size: 20px;
    align-items: center;
    border: 0px solid;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 9px;
    padding: 7px;
    border-radius: 5px;
    max-width: 800px;
    width: 90%;
    height: 40px;
    cursor: pointer;
`;