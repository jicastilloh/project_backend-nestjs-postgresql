import { Movement } from "src/modules/movements/entities/movement.entity";
import { Product } from "src/modules/products/entities/product.entity";
import { Column, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Entity } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn({type: 'int'})
    id: number;

    @Column({unique: true, type: 'varchar', length: 50})
    name: string;

    @Column({type: 'varchar', length: 150, nullable: true})
    description: string

    @OneToMany(() => Product, product =>  product.category)
    products: Product[]

    @OneToMany(() => Movement, movement =>  movement.category)
    movements: Movement[]

    @CreateDateColumn({ type: 'time without time zone', default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date

    @UpdateDateColumn({ type: 'time without time zone',  default: () => 'CURRENT_TIMESTAMP' })
    updateAt: Date

}