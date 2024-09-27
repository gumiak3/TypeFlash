import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { UsersModule } from './users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';

config();

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(process.env.DATABASE), // Connect to your test database
        UsersModule,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'test1',
        email: 'test1@gmail.com',
        password: 'test2',
      };
      const user: User = { id: 1, ...createUserDto };

      const result = await service.create(createUserDto);
    });
  });
});
