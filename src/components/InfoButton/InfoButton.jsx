import { IoMdInformationCircleOutline } from "react-icons/io";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const InfoButton = ({text}) => {
  return (
    <Tooltip title={text} placement="right" color="black">
      <IconButton>
        <IoMdInformationCircleOutline  color="black"/>
      </IconButton>
    </Tooltip>
  );
}

export default InfoButton