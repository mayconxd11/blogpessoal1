import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemaController } from "./controllers/tema.controller";
import { Tema } from "./entities/tema.entity";
import { TemaService } from "./services/tema.services";


@Module({
    imports:[TypeOrmModule.forFeature([Tema])],
    controllers:[TemaController],
    exports:[TypeOrmModule],
    providers:[TemaService],
    
})
export class TemaModule{}