import DevicesServices from "../Services/DevicesServices";
import { createContext, ReactNode, useEffect, useState } from "react";
import { DeviceContextType, IDevice } from "../@types/device";
import { socket } from "../Utils/websocket";

// export const TodoContext = createContext<DeviceContextType | null>(null);
export const DeviceContext = createContext({});

interface Props {
  children: ReactNode;
}

export function DeviceProvider({ children }: Props) {
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [deviceSelected, setDeviceSelected] = useState<IDevice>();
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDevices = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await DevicesServices.fetchAll();
      setDevices(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchOneDevice = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await DevicesServices.fetchOne(id);
      setDeviceSelected(response.data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveDevice = async (device: IDevice) => {
    setLoading(true);
    setError(null);
    try {
      const response = await DevicesServices.create(device);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateDevice = async (id: string, device: IDevice) => {
    setLoading(true);
    setError(null);
    try {
      delete device._id;
      delete device._v;

      const response = await DevicesServices.update(id, device);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteDevice = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await DevicesServices.delete(id);
      let data = devices.filter((device) => device._id !== id);

      setDevices(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    if (id) {
      fetchOneDevice();
    }
  }, [id]);

  useEffect(() => {
    socket.on("new_device", (data) => {
      setDevices((current) => [...current, data]);
    });

    socket.on("device_data_update", (data) => {
      const newDevices = devices?.map((device, index) => {
        if (data?.id === device?._id) {
          device.data = data?.data;
        }

        return device;
      });
      setDevices(newDevices);
    });

    return () => {
      socket.off("new_device");
      socket.off("device_data_update");
    };
  }, [socket, devices]);

  const contextValues: DeviceContextType = {
    devices,
    deviceSelected,
    loading,
    error,
    setId,
    fetchDevices,
    fetchOneDevice,
    saveDevice,
    updateDevice,
    deleteDevice,
  };

  return (
    <DeviceContext.Provider value={contextValues}>
      {children}
    </DeviceContext.Provider>
  );
}
