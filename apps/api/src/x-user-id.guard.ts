import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

const VALID_USER_IDS = ['ngabroger', 'admin123']; 

@Injectable()
export class XUserIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers['x-user-id'];
    if (!userId || typeof userId !== 'string' || !VALID_USER_IDS.includes(userId)) {
      throw new UnauthorizedException('x-user-id header invalid');
    }
    return true;
  }
}