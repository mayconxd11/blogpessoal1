import { Controller } from "@nestjs/common";
import { Body, Get, HttpCode, Post, Put, UseGuards } from "@nestjs/common/decorators";
import { HttpStatus } from "@nestjs/common/enums";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioService } from "../services/usuario.service";


@Controller('/usuarios')
export class UsuarioController {
    constructor (
        private readonly usuarioService: UsuarioService
    ){}
    
    @UseGuards(JwtAuthGuard)
    @Get ('/all')
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Usuario[]>{
        return await this.usuarioService.findAll();
    }
    @Post ('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async create (@Body() usuario: Usuario): Promise<Usuario>{
        return await this.usuarioService.create(usuario);
    }
    @UseGuards(JwtAuthGuard)
    @Put ('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario:Usuario): Promise<Usuario>{
        return await this.usuarioService.update(usuario);
    }
}