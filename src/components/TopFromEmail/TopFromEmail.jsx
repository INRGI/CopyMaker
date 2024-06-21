import React, { useState } from "react";
import { Container, Input, Item } from "./TopFromEmail.styled";

const topFroms = [
  {
    id: 1,
    name: "test1",
  },
  {
    id: 2,
    name: "test2",
  },
];

const TopFromEmail = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFroms = topFroms.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Input
        type="text"
        placeholder="Find From Name by copy"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Container>
        {filteredFroms.map((item) => (
          <Item key={item.id}>
            <p>{item.name}</p>
          </Item>
        ))}
      </Container>
    </>
  );
};

export default TopFromEmail;
