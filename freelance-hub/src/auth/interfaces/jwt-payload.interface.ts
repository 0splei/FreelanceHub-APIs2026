// Estructura de los datos que viajan dentro del token JWT.
export interface JwtPayload {
  // `sub` representa el ID del usuario autenticado.
  sub: number;
  email: string;
  name: string;
}