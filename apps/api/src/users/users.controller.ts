import { Controller, Post, Body } from '@nestjs/common';

const VALID_USER_IDS = ['ngabroger', 'admin123']; 

@Controller('api/users')
export class UsersController {
  @Post('verify')
  verifyUserId(@Body('userId') userId: string) {
    if (!userId || !VALID_USER_IDS.includes(userId)) {
      return { valid: false, message: 'User ID tidak valid' };
    }
    return { valid: true, message: 'User ID valid' };
  }
}