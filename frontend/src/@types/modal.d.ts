export type ModalContextType = {
  title: string;
  open: boolean;
  handleClickOpen: (title: string, id?: string) => void;
  handleClose: () => void;
};
