import { Container, Item, List, Title } from "./TopCopies.styled";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notPriority = [
  "MPPX41OZ8",
  "BTUW3GS1",
  "BTUA77BM13",
  "BTUA403",
  "BTDD409OS1",
  "BTDD407OS1",
  "BTWG67BN10",
  "BTUA75",
  "MPIN27RM4",
  "BTWG404Y26",
];

const priority = [
  "WSOR1JY1",
  "WSNC302GS1",
  "WSFC56GH1",
  "EPRW201BM3",
  "WSKG2BM3",
  "EPGT10",
  "HBTR1",
  "IAL6",
  "EPRL1",
  "WSOR1RM1",
];

const TopCopies = () => {
  const handleCopy = () => {
    toast.success("Copie name copied", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <>
      <Container>
        <Title>Top 10 NP</Title>
        <List>
          {notPriority.map((item, index) => {
            return (
              <Item
                onClick={() => {
                  navigator.clipboard.writeText(item);
                  handleCopy();
                }}
                key={index}
              >
                {item}
              </Item>
            );
          })}
        </List>
      </Container>
      <Container>
        <Title>Top 10 P</Title>
        <List>
          {priority.map((item, index) => {
            return (
              <Item
                onClick={() => {
                  navigator.clipboard.writeText(item);
                  handleCopy();
                }}
                key={index}
              >
                {item}
              </Item>
            );
          })}
        </List>
      </Container>
    </>
  );
};

export default TopCopies;
