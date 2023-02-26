import { useContext } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Container, IconButton, Typography } from "@mui/material";
import { DeviceContext } from "../../Contexts/DeviceContext";
import { DeviceContextType } from "../../@types/device";
import { Box } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CreateIcon from "@mui/icons-material/Create";
import { useModalContext } from "../../Contexts/ModalContext";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ListDevices() {
  const { devices, deleteDevice } = useContext(
    DeviceContext
  ) as DeviceContextType;
  const { handleClickOpen } = useModalContext();

  return (
    <Container>
      <Typography variant="h4" sx={{ pb: 1 }}>
        Lista de Dispositivos
        <Button
          onClick={() => handleClickOpen("Adicionar Dispositivo")}
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ ml: 1 }}
        >
          Adicionar
        </Button>
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>Número de Série</StyledTableCell>
              <StyledTableCell>Descrição</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Informações do Dispositivo</StyledTableCell>
              <StyledTableCell>Ações</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {devices.map((device) => (
              <StyledTableRow key={device._id}>
                <StyledTableCell>{device.name}</StyledTableCell>
                <StyledTableCell>{device.serialNumber}</StyledTableCell>
                <StyledTableCell>{device.description}</StyledTableCell>
                <StyledTableCell>{device.status}</StyledTableCell>
                <StyledTableCell>
                  {device?.data?.map((data, index) => (
                    <p key={index}>
                      {`${data.title}: ${data.value} ${data.unit}`}
                    </p>
                  ))}
                </StyledTableCell>
                <StyledTableCell>
                  <Box>
                    <IconButton
                      onClick={() =>
                        handleClickOpen("Editar Dispositivo", device._id)
                      }
                      aria-label="delete"
                      sx={{ color: "black" }}
                    >
                      <CreateIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                      onClick={() => deleteDevice(device._id)}
                      aria-label="delete"
                      sx={{ color: "black" }}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
