
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {

    @ApiProperty()
    @IsNotEmpty()
    name: string;
}
