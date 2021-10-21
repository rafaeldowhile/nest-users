import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyDocumentsService } from './company-documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CompanyDocumentDto } from './dtos/company-document.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller({
  path: '/company/documents',
})
export class CompanyDocumentsController {
  constructor(
    private readonly companyDocumentsService: CompanyDocumentsService,
  ) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Req() req,
    @UploadedFile('file') file: Express.Multer.File,
    @Body() profileDocumentDto: CompanyDocumentDto,
  ): Promise<any> {
    return await this.companyDocumentsService.create(
      req.user,
      file,
      profileDocumentDto,
    );
  }
}
