import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { Postagem } from "./entities/postagem.entity";
import { PostagemControler } from "./controllers/postagem.controller";
import { PostagemService } from "./services/postagem.service";


@Module({
    imports: [TypeOrmModule.forFeature([Postagem])],
    providers: [PostagemService],
    controllers: [PostagemControler],
    exports: [TypeOrmModule]
})
export class PostagemModule{}