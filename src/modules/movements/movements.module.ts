import { Module } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { MovementsController } from './movements.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Movement } from './entities/movement.entity';
import { ProductsModule } from '../products/products.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movement]), ProductsModule, CategoriesModule],
  controllers: [MovementsController],
  providers: [MovementsService],
  exports: [MovementsService]
})
export class MovementsModule {}
