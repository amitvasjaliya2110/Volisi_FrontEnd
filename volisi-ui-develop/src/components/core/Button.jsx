/* eslint-disable react/prop-types */
import MaterialButton from "@mui/material/Button";
import { COLORS } from "../../constants/constants";
const Button = (props) => {
  const {
    className,
    name,
    backgroundColor = COLORS.primary,
    fontColor = "#FFFFFF",
    onClick,
    width = "100%",
    ...otherProps
  } = props;

  const buttonStyle = {
    backgroundColor,
    color: fontColor,
    width,
  };

  return (
    <MaterialButton
      className={className}
      style={buttonStyle}
      onClick={onClick}
      {...otherProps}
    >
      {name}
    </MaterialButton>
  );
};
export default Button;
