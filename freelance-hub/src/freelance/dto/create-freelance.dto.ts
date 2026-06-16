import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

// DTO para publicar un servicio freelance.
export class CreateFreelanceDto {

  @ApiProperty({
  
    example: 'Diseno de logo profesional',
    description: 'Nombre del servicio freelance',
  
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
  
    example: 'Diseno',
    description: 'Categoria del servicio',
  
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
  
    example: 'Incluye tres propuestas de logo y una ronda de ajustes.',
    description: 'Descripcion detallada del servicio',
  
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
  
    example: 119.99,
    description: 'Precio estimado en dolares',
  
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;

}