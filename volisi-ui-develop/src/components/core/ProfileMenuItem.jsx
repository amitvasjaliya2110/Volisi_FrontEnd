import { useState } from "react";
import { Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModel";

const iconSize = { width: 24, height: 24 };

const ProfileMenuItem = ({ anchorEl, open, handleClose }) => {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleMenuItemClick = (menu) => {
    handleClose();
    if (menu.text === "Logout") {
      setModalOpen(true);
    } else {
      navigate(menu.path);
    }
  };

  const handleLogoutConfirm = () => {
    setModalOpen(false);
    navigate("/login");
  };

  const menuItems = [
    {
      icon: <AccountCircleIcon sx={iconSize} />,
      text: "Profile Setting",
      path: "/change-password",
    },
    {
      icon: <LogoutIcon sx={iconSize} />,
      text: "Logout",
      path: "/login",
      color: "red",
    },
  ];

  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
        PaperProps={{
          sx: {
            width: "174px",
            padding: "0px 12px 0px 12px",
            borderRadius: "8px",
            marginTop: "10px",
          },
        }}
      >
        {menuItems.map((menu, index) => (
          <MenuItem
            key={index}
            onClick={() => handleMenuItemClick(menu)}
            sx={{
              width: "150px",
              height: "48px",
              padding: "8px 0px",
              borderBottom: index < menuItems.length - 1 ? "1px solid" : "none",
              borderColor: "#D4D4D8",
            }}
          >
            <ListItemIcon
              sx={{ ...iconSize, color: menu.color ? menu.color : "#18181B" }}
            >
              {menu.icon}
            </ListItemIcon>
            <ListItemText
              primary={menu.text}
              sx={{
                "& .MuiListItemText-primary": {
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: menu.text === "Logout" ? "#E93E3A" : "#18181B",
                },
              }}
            />
          </MenuItem>
        ))}
      </Menu>
      <ConfirmationModal
        open={isModalOpen}
        handleClose={() => setModalOpen(false)}
        handleConfirm={handleLogoutConfirm}
      />
    </>
  );
};

export default ProfileMenuItem;
