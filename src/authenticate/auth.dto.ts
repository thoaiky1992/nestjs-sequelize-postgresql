import { ApiProperty } from "@nestjs/swagger";

export class authDto {
    @ApiProperty()
    email: string;
    
    @ApiProperty()
    password: string;
}