import { AuthService } from '../src/auth/auth.service';
import { AuthModule } from '../src/auth/auth.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

describe('Auth', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleRef.createNestApplication();
    authService = moduleRef.get<AuthService>(AuthService);
    await app.init();
  });

  describe('注册', () => {
    const registerDto = {
      email: 'test11@example.com',
      password: 'Test123!',
    };

    it('应该成功注册新用户', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('id');
          expect(res.body.email).toBe(registerDto.email);
          // expect(res.body).not.toHaveProperty('password');
        });
    });

    it('应该拒绝重复用户名注册', async () => {
      // 先注册一个用户
      await request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto);

      // 尝试使用相同用户名再次注册
      return request(app.getHttpServer())
        .post('/auth/register')
        .send(registerDto)
        .expect(409)
        .expect((res) => {
          expect(res.body.message).toContain('User already exists');
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
