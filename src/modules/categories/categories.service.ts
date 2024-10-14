import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm'

@Injectable()
export class CategoriesService {

  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>){}

  async create(createCategoryDto: CreateCategoryDto) {

    const categoryFound = await this.categoryRepository.findOne({
      where: {
        name: createCategoryDto.name
      }
    })

    if(categoryFound){
      throw new HttpException('Category already exists', HttpStatus.CONFLICT)
    }

    const newCat = this.categoryRepository.create(createCategoryDto)
    return this.categoryRepository.save(newCat)
  }

  findAll() {
    return this.categoryRepository.find()
  }

  async findOne(id: number) {
    const categoryFound = await this.categoryRepository.findOne({
      where: {
        id
      }
    })

    if (!categoryFound){
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
    }

    return categoryFound

  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryFound = await this.categoryRepository.findOne({
      where: {
        id
      }
    })

    if (!categoryFound){
      return  new HttpException('Category not found', HttpStatus.NOT_FOUND)
    }

    return this.categoryRepository.update(id, updateCategoryDto)
  }

  async remove(id: number) {
    const result = await this.categoryRepository.delete({id})

    if (result.affected === 0){
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND)
    }

    return result;
  }

}