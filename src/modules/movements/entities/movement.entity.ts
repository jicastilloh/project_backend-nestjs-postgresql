import { Product } from "src/modules/products/entities/product.entity";
import { Category } from '../../categories/entities/category.entity'
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";

@Entity()
export class Movement {

    @PrimaryGeneratedColumn({type: 'int'})
    id:  number;

    @Column({type: 'varchar', length: 50})
    type:  string;

    @Column({type: 'int'})
    quantity: number;

    @Column({type: 'int'})
    productid: number;

    @Column({type: 'int'})
    categoryid: number;

    @CreateDateColumn({ type:  'date', default:  () => 'CURRENT_DATE' })
    createAt: Date

     // Relación con Product
     @ManyToOne(() => Product, product => product.movements)
     @JoinColumn({ name: "productid" })  // Vincula la columna productid con la relación product
     product: Product;
 
     // Relación con Category
     @ManyToOne(() => Category, category => category.movements)
     @JoinColumn({ name: "categoryid" })  // Vincula la columna categoryid con la relación category
     category: Category;

}
