import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceSchema } from './schemas/device.schema';
import { DevicesGateway } from './devices.gateway';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from 'src/Pipes/valitation.pipe';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Device.name,
        schema: DeviceSchema,
      },
    ]),
  ],
  controllers: [DevicesController],
  providers: [
    DevicesService,
    DevicesGateway,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class DevicesModule {}
