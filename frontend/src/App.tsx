import { CssBaseline, Grid } from "@mui/material";
import ListDevices from "./Components/ListDevices";
import Modal from "./Components/Modal";
import { DeviceProvider } from "./Contexts/DeviceContext";
import { ModalProvider } from "./Contexts/ModalContext";

function App() {
  return (
    <DeviceProvider>
      <ModalProvider>
        <Grid
          container
          height="100vh"
          justifyContent="center"
          alignContent="center"
          direction="column"
        >
          <CssBaseline />
          <ListDevices />
          <Modal />
        </Grid>
      </ModalProvider>
    </DeviceProvider>
  );
}

export default App;
