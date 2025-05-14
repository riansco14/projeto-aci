// src/pages/Login.jsx
import { useEffect, useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { blue } from "@mui/material/colors";
import { School } from "@mui/icons-material";

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.length === 0 || password.length === 0) {
      alert("Preencha todos os campos");
      return;
    }
    const result = await login({ email, password });
    if (result.success) {
      navigate("/dashboard", { replace: true });
    } else {
      setError(result.message);
    }
  };

  return (
    <Box
      minHeight="100vh"
      sx={{
        backgroundColor: blue[50],
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ backgroundColor: "white", py: 8, px: 8 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 4,
            }}
          >
            <School sx={{ mr: 2, fontSize: 36, color: blue[700] }} />
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              Login
            </Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Senha"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" variant="contained" fullWidth>
              Entrar
            </Button>
          </form>

          <Button
            variant="text"
            sx={{ mt: 4 }}
            fullWidth
            onClick={() => navigate("/register")}
          >
            Registrar
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
