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

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Layout de página completa */}
      <Box display="flex" flexDirection="column" minHeight="100vh">
        {/* Header */}
        <Box
          sx={{
            height: "100px",
            boxShadow: 3,
            display: "flex",
            flexDirection: "row",
            position: "relative",
          }}
        >
          <Container>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                height: "100px",
              }}
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              <School sx={{ mr: 2, fontSize: 40, color: blue[700] }} />
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                Observatório Estudantil
              </Typography>
            </div>
          </Container>
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              height: "100%",
              alignContent: "center",
            }}
          >
            <UserMenu
              sxContainer={{
                marginRight: 2,
                //position: "absolute",
                // right: 0,
                // top: 0,
              }}
            />
          </Box>
        </Box>

        {/* Conteúdo principal */}
        <Box
          component="main"
          flexGrow={1}
          display="flex"
          sx={{ pt: 4, backgroundColor: blue[50] }}
        >
          <Container>
            <Outlet /> {/* Aqui é onde o conteúdo da rota será exibido */}
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
