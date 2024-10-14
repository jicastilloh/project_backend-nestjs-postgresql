import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { MovementsModule } from './modules/movements/movements.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { ReportsModule } from './modules/reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    ProductsModule, 
    CategoriesModule, 
    MovementsModule, 
    ReportsModule, 
    TypeOrmModule.forRoot({
      type:  'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'inventory',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    })
  ]
})
export class AppModule {}