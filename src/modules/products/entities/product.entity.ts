import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from  '../../categories/entities/category.entity'
import { Movement } from '../../movements/entities/movement.entity'

@Entity()
export class Product {

    @PrimaryGeneratedColumn({type: 'int'})
    id: number

    @Column({unique: true, type: 'varchar', length: 50})
    name: string

    @Column({type: 'varchar', length:  150, nullable: true})
    description: string

    @Column({type: 'float'})
    price: number

    @Column({type: 'int'})
    quantity: number

    @Column({type: 'int'})
    categoryid: number

    @ManyToOne(() => Category, category => category.products)
    category: Category

    @OneToMany(() => Movement, movements => movements.product)
    movements: Movement[];

    @CreateDateColumn({ type: 'time without time zone', default:  () => 'CURRENT_TIMESTAMP' })
    createAt: Date

    @UpdateDateColumn({ type: 'time without time zone', default:  () => 'CURRENT_TIMESTAMP' })
    updateAt: Date

}
