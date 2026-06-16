// Forma del usuario que Nest deja disponible en `req.user` tras validar el JWT.
export interface AuthenticatedUser {

  userId: number;
  email: string;
  name: string;

}