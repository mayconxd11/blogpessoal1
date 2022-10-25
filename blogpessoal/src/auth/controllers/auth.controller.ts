import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { Usuariologin } from "../entities/usuariologin.entity";
import { LocalAuthGuard } from "../guard/local-auth.guard";
import { AuthService } from "../services/auth.service";

@Controller ('/auth')
export class AuthController {
    constructor (private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @HttpCode (HttpStatus.OK)
    @Post ('/logar')
    async login (@Body () user: Usuariologin): Promise<any> {
        return this.authService.login(user);
    }
}
