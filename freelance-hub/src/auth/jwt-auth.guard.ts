import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// Esta guard activa la estrategia `jwt`.
// Si el request no trae un Bearer token válido, Nest responde 401.
// Si el token es válido, el usuario autenticado quedará disponible en `req.user`.
export class JwtAuthGuard extends AuthGuard('jwt') {}