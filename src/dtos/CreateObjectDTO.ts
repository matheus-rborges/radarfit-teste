import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { OBJECT_PROPERTIES } from '../constants';

export class CreateObjectDTO {
    @IsString()
    @ApiProperty(OBJECT_PROPERTIES.DESCRIPTION)
    description: 'string';

    @IsString()
    @ApiProperty(OBJECT_PROPERTIES.NAME)
    name: 'string';
}
