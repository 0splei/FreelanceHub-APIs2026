import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from '../users/users.service';
import { CreateFreelanceDto } from './dto/create-freelance.dto';
import { Freelance } from './freelance.entity';

@Injectable()
export class FreelanceService {

  constructor(

    @InjectRepository(Freelance)
    private readonly freelanceRepository: Repository<Freelance>,
    private readonly usersService: UsersService,
  
  ) {}

  // Publica un servicio usando el provider tomado desde el JWT.
  async create(createFreelanceDto: CreateFreelanceDto, providerId: number) {

    const provider = await this.usersService.findById(providerId);

    if (!provider) {
      throw new UnauthorizedException('User not found');
    }

    const freelance = this.freelanceRepository.create({

      title: createFreelanceDto.title,
      category: createFreelanceDto.category,
      description: createFreelanceDto.description,
      price: createFreelanceDto.price,
      provider,
    
    });

    const savedFreelance = await this.freelanceRepository.save(freelance);

    return {

      id: savedFreelance.id,
      title: savedFreelance.title,
      category: savedFreelance.category,
      description: savedFreelance.description,
      price: Number(savedFreelance.price),
      provider: {

        id: provider.id,
        name: provider.name,
      
      },

    };

  }

  // Lista publica de servicios disponibles.
  async findAllPublic() {

    const services = await this.freelanceRepository.find({

      relations: { provider: true },
      order: { id: 'ASC' },
    
    });

    return services.map((service) => ({

      id: service.id,
      title: service.title,
      category: service.category,
      description: service.description,
      price: Number(service.price),
      provider: {
    
        id: service.provider.id,
        name: service.provider.name,
    
      },
    
    }));

  }

}