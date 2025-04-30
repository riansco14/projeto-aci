import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export const DinamicTable = ({
  colunas,
  dados,
}: {
  colunas: any;
  dados: any;
}) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        width: "100%",
        height: "300px",
        overflow: "auto", // Scroll automático, não mexer
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {colunas.map((coluna, index) => (
              <TableCell key={index} sx={{ fontWeight: "bold" }}>
                {coluna}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dados.map((linha, i) => (
            <TableRow key={i}>
              {linha.map((valor, j) => (
                <TableCell key={j}>{valor}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
