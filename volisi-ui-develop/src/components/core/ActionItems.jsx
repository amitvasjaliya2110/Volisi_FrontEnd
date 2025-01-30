import React from "react";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

const getDividerStyle = () => ({
  marginLeft: 2,
  marginRight: 2,
  padding: 0,
});

const ActionItems = ({ anchorEl, handleClose, menuItems }) => {
  const menuComponents = menuItems
    .flatMap((item, index) => [
      <MenuItem key={index} onClick={item.onClick || handleClose}>
        <ListItemIcon>
          {React.createElement(item.icon, {
            fontSize: "small",
            className: item.iconClass,
          })}
        </ListItemIcon>
        <ListItemText className={item.textClass}>{item.name}</ListItemText>
      </MenuItem>,
      index < menuItems.length - 1 ? (
        <Divider key={`divider-${index}`} sx={getDividerStyle()} />
      ) : null,
    ])
    .filter(Boolean);

  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {menuComponents}
    </Menu>
  );
};

export default ActionItems;
