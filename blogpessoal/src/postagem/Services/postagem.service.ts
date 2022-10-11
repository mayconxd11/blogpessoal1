import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";

@Injectable()
export class PostagemService {
    update(postagem: Postagem): Promise<Postagem> {
        throw new Error("Method not implemented.");
    }
    create(postagem: Postagem): Promise<Postagem> {
        throw new Error("Method not implemented.");
    }
    findByTitulo(titulo: string): Promise<Postagem[]> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Postagem> {
        throw new Error("Method not implemented.");
    }
    postagemRepository: any;
    constructor(
        @InjectRepository(Postagem)
        postagemRepository: Repository<Postagem>
    ){}
    async fundAll (): Promise<Postagem[]> {
        return await  this.postagemRepository.find();
    }
}