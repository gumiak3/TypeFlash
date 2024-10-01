import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';
import { AccessTokenType } from './types';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string): Promise<AccessTokenType> {
    const user = await this.usersService.findByEmail(email);

    // password compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    if (await this.usersService.findByEmail(email)) {
      throw new BadRequestException('User does exists');
    }

    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

    const newUser: Partial<User> = {
      ...createUserDto,
      password: hashedPassword,
      role: 'user',
    };

    return this.usersService.create(newUser);
  }
}
