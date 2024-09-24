
import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeChildren, TreeParent } from 'typeorm';

@Entity()
@Tree("closure-table") 
export class Category {
    @PrimaryGeneratedColumn({name: "id"})
    id: number = 0;

    @Column({name: "name"})
    name: string = "default";

    @Column()
    @TreeChildren()
    children?: String[];

    @Column()
    @TreeParent()
    parent?: String;
}