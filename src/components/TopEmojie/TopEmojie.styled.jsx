import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
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

export const Item = styled.li`
    display: flex;
    justify-content: center;
    font-size: 25px;
    align-items: center;
    border: 0px solid;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 9px;
    padding: 7px;
    border-radius: 5px;
    max-width: 30px;
    width: 95%;
    height: 30px;
    cursor: pointer;
    &:hover{
        transform: translateY(-0.5px);
        font-size: 27px;
    }
`;
export const List = styled.ul`
    list-style: none;
    display: flex;
    gap: 12px;
    width: 90%;
    padding: 0;
    flex-wrap: wrap;
`;

export const Title = styled.p`
    font-size: 25px;
    font-weight: bold;
    margin: 0;
`;