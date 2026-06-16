import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// Representa un servicio freelance publicado por un usuario.
@Entity('services')
export class Freelance {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => User, (user) => user.services, { nullable: false })
  provider: User;

}