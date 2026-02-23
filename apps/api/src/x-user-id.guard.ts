import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class XUserIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers['x-user-id'];
    if (!userId || typeof userId !== 'string' || !userId.trim()) {
      throw new UnauthorizedException('x-user-id header required');
    }
    return true;
  }
}