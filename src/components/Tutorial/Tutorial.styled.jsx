import styled from "@emotion/styled";

export const Container = styled.div`
    display: flex;
    gap: 15px;
    align-content: center;
    justify-content: center;
    padding-top: 20px;
`;


export const BodyContainer = styled.div`
    display: flex;
    gap: 15px;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 660px;
    border-radius: 16px;
    box-shadow: 0 30px 30px -25px rgba(65, 51, 183, 0.25);
    background-color:#fff;
    padding-top:20px;
    padding-bottom:20px;
    overflow-y: auto;
`;