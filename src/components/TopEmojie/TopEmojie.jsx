import { Container, Item, List, Title } from "./TopEmojie.styled";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const emoArray = [
  "💊",
  "🌐",
  "🌎",
  "🗽",
  "📷",
  "🔍",
  "👀",
  "🔎",
  "❓",
  "🫢",
  "🤫",
  "🗣️",
  "💬",
  "💢",
  "💥",
  "💯",
  "✅",
  "❎",
  "🏛️",
  "📈",
  "🚀",
  "🛸",
  "📻",
  "🔈",
  "📢",
  "🎖️",
  "🪖",
  "💣",
  "☢️",
  "🔋",
  "🔌",
  "⚡",
  "💫",
  "🖇️",
  "📌",
  '🎯'
];

const TopEmojie = () => {
  const handleCopy = () => {
    toast.success("Emoji copied", {
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
      <Title>Top Emoji</Title>
      <List>
        {emoArray.map((item, index) => (
          <Item
            key={index}
            onClick={() => {
              navigator.clipboard.writeText(item);
              handleCopy();
            }}
          >
            {item}
          </Item>
        ))}
      </List>
    </Container>
  );
};

export default TopEmojie;
