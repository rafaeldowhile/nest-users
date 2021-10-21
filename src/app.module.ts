import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SignupModule } from './modules/signup/signup.module';
import { MONGO_URL } from './config/environments';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { CompanyModule } from './modules/company/company.module';
import { CompanyAddressModule } from './modules/company-address/company-address.module';
import { CompanyPartnerModule } from './modules/company-partner/company-partner.module';
import { ProfileDocumentsModule } from './modules/profile-documents/profile-documents.module';
import { CompanyPartnerDocumentsModule } from './modules/company-partner-documents/company-partner-documents.module';
import { CompanyDocumentsModule } from './modules/company-documents/company-documents.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      MONGO_URL,
    ),
    SignupModule,
    AuthModule,
    ProfileModule,
    CompanyModule,
    CompanyAddressModule,
    CompanyPartnerModule,
    ProfileDocumentsModule,
    CompanyDocumentsModule,
    CompanyPartnerDocumentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
