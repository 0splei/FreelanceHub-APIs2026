import { Freelance } from 'src/freelance/freelance.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Define la tabla `users` y sus relaciones.
@Entity('users')
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Freelance, (service) => service.provider)
  services: Freelance[];

}