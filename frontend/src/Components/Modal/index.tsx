import { useState, Fragment, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import { useModalContext } from "../../Contexts/ModalContext";
import { DeviceContextType, IDevice } from "../../@types/device";
import { IconButton, TextField } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeviceContext } from "../../Contexts/DeviceContext";
import { CompressOutlined } from "@mui/icons-material";

const schema = yup.object().shape({
  name: yup.string().required("O nome é obrigatório"),
  serialNumber: yup.string().required("O número de série é obrigatório"),
  description: yup.string().required("O descrição é obrigatório"),
  status: yup.string().required("O status é obrigatório"),
  data: yup.array().of(
    yup.object().shape({
      title: yup.string(),
      value: yup.number(),
      unit: yup.string(),
    })
  ),
});

export default function Modal() {
  const { title, open, handleClose } = useModalContext();
  const { deviceSelected, saveDevice, updateDevice } = useContext(
    DeviceContext
  ) as DeviceContextType;
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<IDevice>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "data",
  });

  const onSubmit = (data: any) => {
    if (deviceSelected?._id) {
      updateDevice(deviceSelected?._id, data);
    } else {
      saveDevice(data);
    }
    reset();
    handleClose();
  };

  const handleAddField = () => {
    append({ title: "", value: 0, unit: "" });
  };

  const handleRemoveField = (indexToRemove: number) => () => {
    remove(indexToRemove);
  };

  useEffect(() => {
    reset();
    setValue("name", deviceSelected?.name);
    setValue("serialNumber", deviceSelected?.serialNumber);
    setValue("status", deviceSelected?.status);
    setValue("description", deviceSelected?.description);
    deviceSelected?.data?.map(({ title, value, unit }: any, index: number) => {
      append({ title, value, unit });
    });
  }, [deviceSelected]);

  return (
    <Fragment>
      <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box>
                <FormControl
                  sx={{ mt: 2, mr: 2, minWidth: 120, maxWidth: 220 }}
                >
                  <TextField
                    label="Name"
                    variant="filled"
                    {...register("name")}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                </FormControl>
                <FormControl
                  sx={{ mt: 2, mr: 2, minWidth: 120, maxWidth: 220 }}
                >
                  <TextField
                    label="Número de Série"
                    variant="filled"
                    {...register("serialNumber")}
                    error={!!errors.serialNumber}
                    helperText={errors.serialNumber?.message}
                  />
                </FormControl>
                <FormControl sx={{ mt: 2, minWidth: 120, maxWidth: 220 }}>
                  <TextField
                    label="Status"
                    variant="filled"
                    {...register("status")}
                    error={!!errors.status}
                    helperText={errors.status?.message}
                  />
                </FormControl>
              </Box>

              <Box>
                <FormControl sx={{ mt: 2, width: 692 }}>
                  <TextField
                    label="Descrição"
                    variant="filled"
                    {...register("description")}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                </FormControl>
              </Box>

              <DialogContentText sx={{ mt: 2 }}>
                Informações do Dispositivo
                <Button
                  onClick={handleAddField}
                  variant="outlined"
                  startIcon={<AddIcon />}
                  size="small"
                  sx={{ ml: 1 }}
                >
                  Adicionar Nova Informação
                </Button>
              </DialogContentText>

              {fields.map((field, index) => (
                <div key={index}>
                  <FormControl
                    sx={{ mt: 2, mr: 2, minWidth: 120, maxWidth: 220 }}
                  >
                    <TextField
                      label="Título"
                      variant="filled"
                      {...register(`data.${index}.title`)}
                    />
                  </FormControl>
                  <FormControl
                    sx={{ mt: 2, mr: 2, minWidth: 120, maxWidth: 220 }}
                  >
                    <TextField
                      label="Valor"
                      variant="filled"
                      {...register(`data.${index}.value`)}
                    />
                  </FormControl>
                  <FormControl sx={{ mt: 2, minWidth: 120, maxWidth: 220 }}>
                    <TextField
                      label="Unidade"
                      variant="filled"
                      {...register(`data.${index}.unit`)}
                    />
                  </FormControl>
                  <FormControl sx={{ mt: 2 }}>
                    <IconButton
                      onClick={handleRemoveField(index)}
                      aria-label="delete"
                      sx={{ color: "black", ml: 1, mt: 1 }}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </FormControl>
                </div>
              ))}

              <Box
                justifyItems="right"
                alignItems="right"
                display="grid"
                width="100%"
              >
                <FormControl
                  sx={{
                    mt: 2,
                    minWidth: 120,
                  }}
                >
                  <Button type="submit" variant="outlined" disabled={!isValid}>
                    Enviar
                  </Button>
                </FormControl>
              </Box>
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
