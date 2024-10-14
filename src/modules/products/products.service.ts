import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from '../categories/categories.service'

@Injectable()
export class ProductsService {

  constructor(@InjectRepository(Product) private productRepository: Repository<Product>, private categoriesService: CategoriesService){}

  async create(createProductDto: CreateProductDto) {

    const categoryFound = await this.categoriesService.findOne(createProductDto.categoryid)
    if (!categoryFound) throw new HttpException('Category not found',  HttpStatus.NOT_FOUND)
      
    const productFound = await this.productRepository.findOne({
      where: {
        name:  createProductDto.name
      }
    })
    if (productFound){
      throw new HttpException('Product already exists', HttpStatus.CONFLICT)
    }

    const newProduct = this.productRepository.create(createProductDto)
    return this.productRepository.save(newProduct)

  }

  findAll() {
    return this.productRepository.find()
  }

  async findOne(id: number){
    const productFound = await this.productRepository.findOne({
      where: {
        id
      },
    })

    if (!productFound){
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }

    return productFound;

  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    
    const productFound = await this.productRepository.findOne({ 
      where: {
        id
      }
     })
  
     if (!productFound){
      throw new HttpException('Product not found',  HttpStatus.NOT_FOUND)
     }
    
    if (updateProductDto.categoryid){
      const categoryFound = await this.categoriesService.findOne(updateProductDto.categoryid)
      if (!categoryFound) throw new HttpException('Category not found',  HttpStatus.NOT_FOUND)
    }


    return this.productRepository.update({id}, updateProductDto)
  }

  async remove(id: number) {
    const result = await this.productRepository.delete({ id })

    if (result.affected === 0){
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }

    return result;
  }

}
