import styled from '@emotion/styled'

export const Container = styled.div`
    display: flex;
    margin-top: 30px;
    gap: 30px;
`;

export const EmptyDomains = styled.h2`

`;

export const DomainsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    height: 380px;
    width: 100%;
    max-width: 700px;
    margin-left: 20px;
    border: 1.5px solid;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 5px;
    padding-top:20px;
    overflow-y: auto;
`;