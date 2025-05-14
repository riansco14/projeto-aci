import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { School } from "@mui/icons-material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { blue } from "@mui/material/colors";
import MessageModal from "../../components/MessageModal";
import UserMenu from "../../components/UserMenu";
import { Outlet, useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Chat: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <MessageModal open={open} onClose={handleClose}></MessageModal>
      {/* Layout de página completa */}
      <Box
        component="main"
        flexGrow={1}
        display="flex"
        sx={{ pt: 4, backgroundColor: blue[50] }}
      >
        <Container>
          <Box display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              startIcon={<ChatBubbleOutlineIcon />}
              sx={{ px: 4, py: 1, borderRadius: 2, textTransform: "initial" }}
              onClick={handleOpen}
            >
              <Typography variant="subtitle1">
                Observatório Estudantil
              </Typography>
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Chat;
