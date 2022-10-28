import { ApiProperty } from "@nestjs/swagger/dist/decorators";

export class Usuariologin {

    @ApiProperty()
    public usuario : string;

    @ApiProperty()
    public senha: string;
}