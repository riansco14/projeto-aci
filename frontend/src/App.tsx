import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import { Box, Button, Container, CssBaseline, Typography } from "@mui/material";
import { School } from "@mui/icons-material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { blue } from "@mui/material/colors";
import MessageModal from "./components/MessageModal";

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

const App: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <CssBaseline />
      <MessageModal open={open} onClose={handleClose}></MessageModal>
      {/* Layout de página completa */}
      <Box display="flex" flexDirection="column" minHeight="100vh">
        {/* Header */}
        <Box sx={{ height: "100px", boxShadow: 3 }}>
          <Container>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              sx={{ height: "100px" }}
            >
              <School sx={{ mr: 2, fontSize: 40, color: blue[700] }} />
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                Observatório Estudantil
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* Conteúdo principal */}
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
      </Box>
    </>
  );
};

export default App;
