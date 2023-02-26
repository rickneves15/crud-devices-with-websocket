// import {
//   Injectable,
//   PipeTransform,
//   ArgumentMetadata,
//   BadRequestException,
// } from '@nestjs/common';
// import { plainToClass } from 'class-transformer';
// import { validate } from 'class-validator';

// @Injectable()
// export class ValitationPipe implements PipeTransform {
//   async transform(value: any, { metatype }: ArgumentMetadata) {
//     if (!metatype) {
//       return value;
//     }

//     const obj = plainToClass(metatype, value);
//     console.log(obj);
//     // return obj;
//     const errors = await validate(obj);

//     if (errors.length > 0) {
//       const messages = errors.map((error) => ({
//         field: error.property,
//         message: Object.values(error.constraints)[0],
//       }));
//       throw new BadRequestException({ messages });
//     }
//     return value;
//   }
// }

import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException({ errors: this.buildError(errors) });
    }

    return value;
  }

  private buildError(errors) {
    console.log(errors);
    return errors.map((error) => {
      return {
        field: error.property,
        message: Object.values(error.constraints)[0],
      };
    });
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
