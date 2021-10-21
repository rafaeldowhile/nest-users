import {
  Body,
  Controller, Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CompanyPartnerDocumentsService } from './company-partner-documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CompanyPartnerDocumentDto } from './dtos/company-partner-document.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller({
  path: '/company/partners/:id/documents',
})
export class CompanyPartnerDocumentsController {
  constructor(
    private readonly companyDocumentsService: CompanyPartnerDocumentsService,
  ) {
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Req() req,
    @Param('id') partnerId,
    @UploadedFile('file') file: Express.Multer.File,
    @Body() profileDocumentDto: CompanyPartnerDocumentDto,
  ): Promise<any> {
    return await this.companyDocumentsService.create(
      req.user,
      partnerId,
      file,
      profileDocumentDto,
    );
  }
}
