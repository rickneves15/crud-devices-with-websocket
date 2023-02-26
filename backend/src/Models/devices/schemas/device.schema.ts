import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { Document } from 'mongoose';

export type DeviceDocument = Device & Document;

interface IData {
  title: number;
  value: number;
  unit: string;
}

@Schema()
export class Device {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  serialNumber: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  status: string;

  @Prop()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  data: IData[];
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
