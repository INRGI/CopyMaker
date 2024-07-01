import { Container, Title } from "./TopCopies.styled";

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
      <Container>
        <Title>
          Top Copies
          <InfoButton text="" />
        </Title>
        
      </Container>
    );
  };
  
  export default TopCopies;