import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Test } from '@nestjs/testing';

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: Partial<Record<keyof UserService, jest.Mock>>;

  beforeEach(async () => {
    usersService = {
      getUsersByCondition: jest.fn(),
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: usersService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('should throw an UnauthorizedException if user is not found', async () => {
      await expect(
        authService.validateUser('739507690@qq.com', '123456'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
