export interface IDevice {
  _id?: sitrng;
  _v?: sitrng;
  name: string;
  serialNumber: string;
  description: string;
  status: string;
  data?: IData[];
}

interface IData {
  title: string;
  value: number;
  unit: string;
}

export type DeviceContextType = {
  devices: IDevice[];
  deviceSelected: IDevice | any;
  loading: boolean;
  error: string | null;
  setId: any;
  fetchDevices: () => void;
  fetchOneDevice: (id: string) => void;
  saveDevice: (device: IDevice) => void;
  updateDevice: (id: string, device: IDevice) => void;
  deleteDevice: (id: string) => void;
};
