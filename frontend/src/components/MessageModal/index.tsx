import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  IconButton,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface MessageModalProps {
  open: boolean;
  onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ open, onClose }) => {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setAnswer(""); // limpa resposta anterior

    try {
      const res = await fetch("http://127.0.0.1:8000/consultar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pergunta: message }),
      });

      if (!res.ok) throw new Error("Erro na API");

      const data = await res.json();
      setAnswer(data.resposta);
    } catch (err) {
      setAnswer("Erro ao consultar resposta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 3,
        }}
      >
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            O que você quer saber hoje ?
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Campo de mensagem */}
        <Box mt={2}>
          <Typography variant="subtitle2" gutterBottom>
            Sua mensagem
          </Typography>
          <TextField
            multiline
            minRows={3}
            fullWidth
            variant="outlined"
            placeholder="Digite sua mensagem para o Observer..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />
        </Box>

        {/* Resposta */}
        {answer && (
          <Box mt={2}>
            <Typography variant="subtitle2" gutterBottom>
              Resposta
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {answer}
            </Typography>
          </Box>
        )}

        {/* Botão Enviar */}
        <Box mt={3}>
          <Button
            variant="contained"
            fullWidth
            sx={{ borderRadius: 2 }}
            onClick={handleSend}
            disabled={loading || !message.trim()}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Enviar"
            )}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default MessageModal;
