import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile, UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileDocumentsService } from './profile-documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileDocumentDto } from './dtos/profile-document.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller({
  path: '/profile/documents',
})
export class ProfileDocumentsController {
  constructor(
    private readonly profileDocumentService: ProfileDocumentsService,
  ) {
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Req() req,
    @UploadedFile('file') file: Express.Multer.File,
    @Body() profileDocumentDto: ProfileDocumentDto,
  ): Promise<any> {
    return await this.profileDocumentService.create(
      req.user,
      file,
      profileDocumentDto,
    );
  }
}
