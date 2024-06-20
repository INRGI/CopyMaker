import { Container, Item } from "./TopFromEmail.styled";

const topFroms = [
    {
        id: 1,
        name: 'test1',
    },
    {
        id: 2,
        name: 'test2',
    },
];

const TopFromEmail = () => {
    return (
        <Container>
            {topFroms.map(item => (
                <Item key={item.id}>
                    <p>{item.name}</p>
                </Item>
            ))}
        </Container>
    )
}

export default TopFromEmail;