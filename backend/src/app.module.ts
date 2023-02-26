import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { DevicesModule } from './Models/devices/devices.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URL), DevicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
