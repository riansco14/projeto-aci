// src/components/UserMenu.jsx
import { useState } from "react";
import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  SxProps,
  Theme,
  Button,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserMenu = ({ sxContainer }: { sxContainer: SxProps<Theme> }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInfo = () => {
    //alert(`Usuário: ${user.name}\nEmail: ${user.email}`);
    navigate("/user-info");
    handleClose();
  };

  const handleLogout = () => {
    logout();
    handleClose();
  };

  return (
    <div>
      <Box
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => handleClick(e)}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginRight: 2,
        }}
      >
        <Typography variant="subtitle1" sx={{ mr: 1 }}>
          {user.name}
        </Typography>
        <IconButton size="small">
          <Avatar>{user.name[0]}</Avatar>
        </IconButton>
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleInfo}>Informações</MenuItem>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
