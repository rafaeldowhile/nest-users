import { IsNotEmpty, MaxLength } from 'class-validator';
import { AppUserType } from '../../../common/enums/app-user-type';
import { Transform } from 'class-transformer';

export class SignupDto {
  @IsNotEmpty()
  @Transform(({ value }) =>
    Object.entries(AppUserType).find(([key, val]) => val === value),
  )
  userType: AppUserType;

  @IsNotEmpty()
  countryId: string;

  @IsNotEmpty()
  @MaxLength(150)
  email: string;

  @IsNotEmpty()
  @MaxLength(150)
  password: string;

  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @IsNotEmpty()
  @MaxLength(150)
  lastname: string;
}
