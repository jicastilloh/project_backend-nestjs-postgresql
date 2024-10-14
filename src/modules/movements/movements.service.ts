import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { ProductsService } from '../products/products.service'
import { CategoriesService } from '../categories/categories.service'
import { InjectRepository } from '@nestjs/typeorm';
import { Movement } from './entities/movement.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class MovementsService {

  constructor(
    @InjectRepository(Movement) private movementRepository: Repository<Movement>,
    private productsService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  async create(createMovementDto: CreateMovementDto) {
    const categoryFound = await this.categoriesService.findOne(createMovementDto.categoryid);
    const productFound = await this.productsService.findOne(createMovementDto.productid);

    if (!categoryFound) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    if (!productFound) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    if (productFound.categoryid !== categoryFound.id) {
      throw new HttpException('Product and category do not match', HttpStatus.BAD_REQUEST);
    }

    if (createMovementDto.type === 'salida') {
      if (createMovementDto.quantity <= 0) {
        throw new BadRequestException('Quantity must be greater than zero');
      }

      if (productFound.quantity < createMovementDto.quantity) {
        throw new BadRequestException('There is not enough stock for an exit');
      }

      productFound.quantity -= createMovementDto.quantity;
      await this.productsService.update(productFound.id, {"quantity":  productFound.quantity});
    } 
    else if (createMovementDto.type === 'entrada') {
      if (createMovementDto.quantity <= 0) {
        throw new BadRequestException('Quantity must be greater than zero');
      }

      productFound.quantity += createMovementDto.quantity;
      await this.productsService.update(productFound.id, {"quantity":  productFound.quantity});
    }

    const newMove = this.movementRepository.create(createMovementDto);
    return this.movementRepository.save(newMove);
  }

  findAll() {
    return this.movementRepository.find()
  }

  async findOne(id: number) {
    const movementFound = this.movementRepository.findOne({
      where: {
        id
      }
    })

    if (!movementFound){
      throw new HttpException('Movement not found', HttpStatus.NOT_FOUND)
    }

    return movementFound

  }

  async update(id: number, updateMovementDto: UpdateMovementDto) {
    const movementFound = await this.movementRepository.findOne({
      where: {
        id
      }
    })

    if (!movementFound){
      throw new HttpException('Movement not found', HttpStatus.NOT_FOUND)
    }

    return this.movementRepository.update(id, updateMovementDto)

  }

  async remove(id: number) {
    const result = await this.movementRepository.delete({id})

    if (result.affected === 0) {
      throw new HttpException('Movement not found', HttpStatus.NOT_FOUND)
    }

    return result;

  }

  async getMovements(startDate: Date,  endDate: Date): Promise<Movement[]> {

    return await this.movementRepository.find({
      where: {
        createAt: Between(startDate, endDate)
      },
      relations: ['product', 'category']
    })

  }
}
