import React, { useState } from "react";
import { Container, Input, Item } from "./TopFromEmail.styled";
import FromNameModal from "../FromNameModal.jsx/FromNameModal";
import { ToastContainer } from "react-toastify";
import { topFroms } from "../../helpers/topFroms";



const TopFromEmail = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState({});

  const handleClick = (item) => {
    setActiveItem(item);
    setModalIsOpen(true);
  };

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
          <Item key={item.id} onClick={() => handleClick(item)}>
            <p>{item.name}</p>
          </Item>
        ))}
      </Container>

      <FromNameModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        activeItem={activeItem}
      />
      <ToastContainer />
    </>
  );
};

export default TopFromEmail;
