import styled from "@emotion/styled";

export const Container = styled.div`
    width: 100%;
    max-width: 400px;
    border: 1.5px solid;
    box-shadow: rgba(34, 34, 34, 0.35) 0px 5px 15px;
    border-radius: 5px;
    overflow: hidden; /* Обрізаємо контент, який виходить за межі контейнера */
    box-sizing: border-box; /* Враховуємо товщину рамок і полів у розрахунках розміру контейнера */
`;

export const ContentContainer = styled.div`
  
`;

export const Empty = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 40px;
`;
