import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { exec } from 'child_process';
import { Model } from 'mongoose';
import { DevicesGateway } from './devices.gateway';
import { DeviceDto, IData, UpdateDeviceDto } from './dto/device.dto';
import { Device, DeviceDocument } from './schemas/device.schema';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name)
    private readonly deviceModel: Model<DeviceDocument>,
    private readonly devicesGateway: DevicesGateway,
  ) {}

  async create(data: DeviceDto): Promise<DeviceDocument> {
    await this.checkSerialNumberExists(data.serialNumber);

    const query = new this.deviceModel(data);
    const device = await query.save();

    await this.devicesGateway.newDevice(device);

    return device;
  }

  async findAll(): Promise<DeviceDocument[]> {
    this.devicesGateway.handleMessage('findAll devices');

    return this.deviceModel.find();
  }

  findOne(id: string) {
    return this.deviceModel.findById(id);
  }

  async update(id: string, data: UpdateDeviceDto): Promise<DeviceDocument> {
    await this.checkSerialNumberExists(data.serialNumber, id);
    await this.checkDataExists(data?.data);

    const newDevice = await this.deviceModel.findByIdAndUpdate(id, data).exec();
    const device = await this.deviceModel.findById(id).exec();

    // if (device?.data?.length > 0) {
    //   await this.devicesGateway.deviceDataUpdate(id, device?.data);
    // }
    if (device !== newDevice) {
      await this.devicesGateway.deviceDataUpdate(id, device?.data);
    }
    return device;
  }

  async remove(id: string) {
    await this.checkDeviceExistsById(id);

    return this.deviceModel.findByIdAndRemove(id);
  }

  async checkDeviceExistsById(id: string): Promise<any> {
    if (!id) return;
    const device = await this.deviceModel.findOne({ _id: id }).exec();

    if (!device) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        errors: 'Device is not exists.',
      });
    }
  }

  async checkSerialNumberExists(
    serialNumber: string,
    id?: string,
  ): Promise<any> {
    if (!serialNumber) return;
    const query = id ? { serialNumber, _id: { $ne: id } } : { serialNumber };
    const device = await this.deviceModel.find(query).exec();

    if (!device || device.length !== 0) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        errors: [
          {
            field: 'serialNumber',
            message: 'serial number already exists.',
          },
        ],
      });
    }
  }

  async checkDataExists(data: any): Promise<any> {
    if (!data && Array.isArray(data)) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        errors: [
          {
            field: 'data',
            message: 'data should not be empty.',
          },
        ],
      });
    }
  }
}
