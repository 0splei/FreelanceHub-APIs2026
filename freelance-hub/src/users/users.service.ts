import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(
        // Repositorio TypeORM para consultar usuarios en la base.
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    // Busca un usuario por su email.
    findByEmail(email: string): Promise<User | null> {
        return this.usersRepository.findOne({ where: { email } });
    }

    // Busca un usuario por su ID.
    findById(id: number): Promise<User | null> {
        return this.usersRepository.findOne({ where: { id } });
    }

}