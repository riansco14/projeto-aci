import { Typography, Container, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { getInfo } from "../../services/authService";

const UserInfo = () => {
  const [data, setData] = useState(null);

  async function fetchData() {
    const data = await getInfo();
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        px: 8,
        py: 4,
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" mb={4}>
        Informações do usuário
      </Typography>
      <AccountCircleIcon sx={{ fontSize: 120, color: blue[100] }} />

      {data ? (
        <Box>
          <Typography variant="subtitle1">
            <Typography variant="subtitle1" fontWeight={600} component={"span"}>
              Nome:{" "}
            </Typography>
            {data.nome}
          </Typography>

          <Typography variant="subtitle1">
            <Typography variant="subtitle1" fontWeight={600} component={"span"}>
              Email:{" "}
            </Typography>
            {data.email}
          </Typography>

          <Typography variant="subtitle1">
            <Typography variant="subtitle1" fontWeight={600} component={"span"}>
              Quantidade de tokens usados:{" "}
            </Typography>
            {data.qntd_tokens}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
};

export default UserInfo;
