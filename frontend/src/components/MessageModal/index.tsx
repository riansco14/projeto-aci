import React, { useState } from "react";
import {
  Box,
  Modal,
  Typography,
  IconButton,
  TextField,
  Button,
  CircularProgress,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DinamicTable } from "../DinamicTable";
import { LineChartCustom } from "../LineChartCustom";

interface MessageModalProps {
  open: boolean;
  onClose: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ open, onClose }) => {
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setAnswer(null); // limpa resposta anterior

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
      setAnswer(data);
    } catch (err) {
      setAnswer({ resposta: "Erro ao consultar resposta. Tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  function extrairTokens(texto) {
    const regex = /{{[^}]+}}/g;
    const tokens = [];
    let ultimoIndice = 0;

    let match;
    while ((match = regex.exec(texto)) !== null) {
      // Adiciona o texto antes do token, se houver
      if (match.index > ultimoIndice) {
        tokens.push(texto.slice(ultimoIndice, match.index));
      }
      // Adiciona o token encontrado
      tokens.push(match[0]);
      ultimoIndice = regex.lastIndex;
    }

    // Adiciona o texto restante após o último token, se houver
    if (ultimoIndice < texto.length) {
      tokens.push(texto.slice(ultimoIndice));
    }

    return tokens;
  }

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
        {answer?.resposta && (
          <Box mt={2}>
            <Typography variant="subtitle2" gutterBottom>
              Resposta
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="justify"
            >
              {answer.resposta}
            </Typography>
          </Box>
        )}
        {answer?.colunas && answer?.dados && answer?.colunas?.length !== 2 ? (
          <Box>
            <Typography variant="subtitle2" gutterBottom my={2}>
              Dados da consulta
            </Typography>
            <DinamicTable colunas={answer?.colunas} dados={answer?.dados} />
          </Box>
        ) : null}

        {answer?.colunas?.length === 2 ? (
          <Box>
            <Typography variant="subtitle2" gutterBottom my={2}>
              Gráfico da consulta
            </Typography>
            <LineChartCustom dados={answer.dados} />
          </Box>
        ) : null}

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
