import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { UsuarioService } from "src/usuario/services/usuario.service";
import { Bcrypt } from "../bcrypt/bcrypt";

@Injectable()
export class AuthService {
    constructor (
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
        private bcrypt: Bcrypt
    ){}

    async validateUser (username: string, password: string): Promise<any> {
        const buscaUsuario = await this.usuarioService.findByUsuario(username);

        if(!buscaUsuario)
        throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

        const match = await this.bcrypt.compararSenhas(buscaUsuario.senha, password);
        if (buscaUsuario && match){
        const {senha, ...result } = buscaUsuario;
        
        }
    }
}