/* eslint-disable prettier/prettier */

import { Body, Controller, Post } from '@nestjs/common'
import {AuthService } from './auth.service'
import {RegisterAuthDto} from './dto/register-auth.dto'
import { LoginAuthDto } from './dto/login-auth.dto'


@Controller('auth')
export class AuthController{

    constructor(private readonly authService: AuthService){}


    @Post('register')
    registerUser(@Body() userObject: RegisterAuthDto){
        return this.authService.register(userObject)
    }

    @Post('login')
    loginUser(@Body( ) userObjectLogin: LoginAuthDto){
        return this.authService.login(userObjectLogin)
    }

    @Post('activate')
    activateUser(@Body() userObjectActivate: RegisterAuthDto){
        return this.authService.activateAccount(userObjectActivate)
    }
    @Post('resetPassword')
    resetPassword(@Body() id: any){
        console.log(id);
        return this.authService.comprobarKey(id.id)
    }
    @Post('getPasswordKey')
    getPasswordKey(@Body() email: any){
        return this.authService.getPasswordKey(email)
    }
    @Post('changePremium')
    changePremium(@Body() email: string){
        return this.authService.changePremium(email)
    }

}