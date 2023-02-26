export class IData {
  title: number;
  value: number;
  unit: string;
}

export class Device {
  name: string;
  serialNumber: string;
  description: string;
  status: string;
  data?: IData[];
}
