import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { School } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name.length === 0 ||
      password.length === 0 ||
      email.length === 0 ||
      confirmPassword.length === 0
    ) {
      setError("Existem campos vázios.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    const result = await register({ name, email, password });

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
        justifyContent: "center",
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
              Criar Conta
            </Typography>
          </div>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Nome"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <TextField
              label="Confirmar Senha"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <Typography color="error">{error}</Typography>}
          </form>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleSubmit}
          >
            Registrar
          </Button>
          <Button
            variant="text"
            sx={{ mt: 4 }}
            fullWidth
            onClick={() => navigate("/login")}
          >
            Já tem uma conta? Entrar
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;
