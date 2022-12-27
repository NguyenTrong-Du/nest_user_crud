import { IsNumberString, Validate } from 'class-validator';
import { UserExists } from 'src/validators/user.validator';

export class UserParams {
  @IsNumberString()
  @Validate(UserExists)
  id: number;
}
