
import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeChildren, TreeParent } from 'typeorm';

@Entity()
@Tree("closure-table") 
export class Category {
    @PrimaryGeneratedColumn()
    id: number=0;

    @Column()
    name: string="default";

    @TreeChildren()
    children?: Category[];

    @TreeParent()
    parent?: Category;
}