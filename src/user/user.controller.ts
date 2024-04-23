/* eslint-disable prettier/prettier */
// user.controller.ts
import { Controller, Post, Body, Get, UseGuards, Delete, Param, Patch, HttpCode, HttpStatus, Put, Res } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.signup(createUserDto);
  }

 @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers(){
      return this.userService.getAllUsers();
  }
  @Get(":email")
  async getEmailUsers(@Param("email") email: string){
      try {
          const users =await this.userService.getEmailUsers(email);
          return users;
      } catch (error) {
          console.error('Error fetching users by email:', error);
      }
  }
  
  @Post()
  createUser(@Body() newUser: CreateUserDto){
  return this.userService.createUser(newUser.username,newUser.email,newUser.password);
  }

  @Delete(":id")
  deleteUser(@Param("id") id:number){
      this.userService.deleteUser(id);
  }

  @Patch(":id")
  updateUser(@Param("id")id: number, @Body() updatedFields: UpdateUserDto){
      this.userService.updateUser(id,updatedFields);
  }

  @Post(':id/answer/:answerId')
  async addAnswerToUser(@Param('id') userId: number, @Param('answerId') answerId: number) {
    const user= await this.userService.addAnswerToUser(userId, answerId);
    return user;
  }

  @Get(':id/answers')
  async getAnswersToUser(@Param('id') userId: number){
    const answers= await this.userService.getAnswersToUser(userId);
    return answers;
  }

  @Delete(':id/answers')
  async clearAnswers(@Param('id') userId: number){
    await this.userService.deleteAnswersToUser(userId);
  }


  @Get(':id/pdfs')
  async getUserDocuments(@Param('id') userId: number) {
    const pdf= await this.userService.getUserDocuments(userId);
    return pdf;
  }

  @Post(':id/pdfs')
  async newUserDocument(@Param('id') userId: number, @Body() content: string){
    const pdf= await this.userService.newUserDocument(userId,content);
    return pdf;
  }

  @Put(':id/pdfs/:idPdf')
  async updateUserPdf(@Param('id') userId:number, @Param('idPdf') pdfId: number, @Body() content: string){
    const pdf=await this.userService.updateUserPdf(userId,pdfId,content);
    return pdf;
  }

  @Delete(':id/pdfs/:idPdf')
  async deletePdfUser(@Param('id') userId:number, @Param('idPdf') documentId: number){
    await this.userService.deleteUserPdf(userId,documentId);
  }

  @Get(':id/pdfs/:idPdf/download')
  async downloadPdf(@Param('id') userId: number, @Param('idPdf') pdfId: number, @Res() res) {
      try {
          const pdfBuffer = await this.userService.downloadUserPdf(userId, pdfId);
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', `attachment; filename="dlt_document.pdf"`);
          res.send(pdfBuffer);
      } catch (error) {
          res.status(404).send({ message: error.message });
      }
  }

}


