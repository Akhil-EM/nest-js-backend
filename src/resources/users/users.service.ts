import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { Token } from 'src/database/entities/token.entity';
import { UserType } from 'src/database/entities/user-type.entity';
import { User } from 'src/database/entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseModel } from 'src/common/models/api.model';
import { TokenType } from 'src/database/entities/token-type.entity';
import verifyAccountTemplate from 'src/common/templates/verify-account.template';
import { encryptionHelper } from 'src/common/helpers/encryption-helper.module';
import { sendMailModule } from 'src/common/helpers/send-mail.module';

@Injectable()
export class UsersService {
  async register(user: RegisterUserDto) {
    const { email, password, name } = user;
    //check email registered already
    const userCheck = await User.findOne({
      where: {
        email,
      },
      raw: true,
    });

    if (userCheck) {
      if (userCheck.email_verified) {
        if (!userCheck.active)
          return ResponseModel('your account is not active contact admin.');
        else return ResponseModel('already have an account try to login');
      } else {
        //has account but mail is not verified
        await Token.update(
          {
            active: false,
          },
          {
            where: {
              token_type_id: 1,
              token_user_id: userCheck.id,
            },
          },
        ); //making old token inactive

        const token = encryptionHelper.generateJwtToken({
          userId: userCheck.id,
        });

        const tokenType = await TokenType.findOne({
          where: {
            token_type: 'REGISTRATION',
          },
          raw: true,
        });
        await Token.create({
          token,
          token_type_id: tokenType.id,
          token_user_id: userCheck.id,
          active: true,
        });

        await sendMailModule.sendMail(
          email,
          'Welcome to bookings.com',
          verifyAccountTemplate(token),
        );

        return ResponseModel(
          'we have send email verification check mail to complete verification',
        );
      }
    }

    //default registration
    const { id } = await UserType.findOne({
      where: {
        user_type: 'USER',
      },
      raw: true,
    });

    //insert in user
    const passwordHash = await encryptionHelper.generatePasswordHash(password);
    const newUser = await User.create({
      email,
      password: passwordHash,
      user_type_id: id,
      name,
      active: false,
    });

    //generate token and send mail
    const token = encryptionHelper.generateJwtToken({ userId: newUser.id });
    const tokenType = await TokenType.findOne({
      where: {
        token_type: 'REGISTRATION',
      },
      raw: true,
    });
    await Token.create({
      token,
      token_type_id: tokenType.id,
      token_user_id: newUser.id,
      active: true,
    });

    await sendMailModule.sendMail(
      email,
      'Welcome to bookings.com',
      verifyAccountTemplate(token),
    );

    return ResponseModel('check your mail to complete registration');
  }
}
