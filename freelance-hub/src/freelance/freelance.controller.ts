import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { FreelanceService } from './freelance.service';
import { CreateFreelanceDto } from './dto/create-freelance.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthenticatedUser } from '../auth/interfaces/authenticated-user.interface';

import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

type RequestWithUser = { user: AuthenticatedUser };

@ApiTags('services')
@Controller('services')
export class FreelanceController {

  constructor(private readonly freelanceService: FreelanceService) {}

  @ApiOperation({
  
    summary: 'Listar servicios disponibles',
    description: 'Retorna el catalogo publico de servicios freelance.',

  })
  @ApiResponse({

    status: 200,
    description: 'Servicios obtenidos exitosamente',

  })
  @Get()
  findAll() {

    return this.freelanceService.findAllPublic();

  }

  @ApiBearerAuth('jwt')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({

    summary: 'Publicar un servicio freelance',
    description: 'Permite a un usuario autenticado publicar un nuevo servicio.',

  })
  @ApiResponse({

    status: 201,
    description: 'Servicio publicado exitosamente',

  })
  @ApiResponse({

    status: 401,
    description: 'Usuario no autenticado',

  })
  @Post()
  create(

    @Body() createFreelanceDto: CreateFreelanceDto,
    @Req() req: RequestWithUser,

  ) {

    return this.freelanceService.create(createFreelanceDto, req.user.userId);

  }

}