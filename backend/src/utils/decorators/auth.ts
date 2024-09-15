import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleGuard } from '@/modules/auth/role.guard';
import { AuthGuard } from '@/modules/auth/auth.guard';

export function Auth(roles?: string | string[], actions?: string[] | string) {
  return applyDecorators(
    SetMetadata('roles', roles),
    SetMetadata('actions', actions),
    UseGuards(AuthGuard, RoleGuard),
  );
}
