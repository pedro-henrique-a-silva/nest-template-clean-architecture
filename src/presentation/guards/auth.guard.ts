import { IRole } from '@domain/interfaces/shared/role.interface'
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { IS_PUBLIC_KEY } from '@presentationcustom-decorators/is-public'
import { ROLES_KEY } from '@presentationcustom-decorators/roles'
import { Request } from 'express'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    const requiredRoles = this.reflector.getAllAndOverride<IRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if (!token) {
      throw new BadRequestException('Token not found')
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })

      request.user = payload
    } catch {
      throw new BadRequestException('Invalid token')
    }

    if (!requiredRoles) {
      return true
    }
    const hasTheCorrectRole = requiredRoles.some((role) =>
      request.user.role?.includes(role),
    )

    if (!hasTheCorrectRole) {
      throw new ForbiddenException(
        'Forbidden resource, you do not have the necessary role',
      )
    }

    return true
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
