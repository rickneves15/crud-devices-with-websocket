import api from "./api";
import { IDevice } from "../@types/device";
import { AxiosResponse } from "axios";

class DevicesService {
  async fetchAll(): Promise<AxiosResponse<IDevice[]>> {
    return await api.get("/devices");
  }

  async fetchOne(id: string): Promise<AxiosResponse<IDevice>> {
    return await api.get(`/devices/${id}`);
  }

  async create(data: IDevice): Promise<AxiosResponse<IDevice>> {
    return await api.post("/devices", data);
  }

  async update(id: string, data: IDevice): Promise<AxiosResponse<IDevice>> {
    return await api.patch(`/devices/${id}`, data);
  }

  async delete(id: string): Promise<AxiosResponse<void>> {
    return await api.delete(`/devices/${id}`);
  }
}

export default new DevicesService();
