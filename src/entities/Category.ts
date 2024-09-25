
import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeChildren, TreeParent } from 'typeorm';

@Entity() 
export class Category {
    @PrimaryGeneratedColumn({name: "id"})
    id: number=0;

    @Column({name: "name"})
    name: string="default";

    @Column({name: "parent_id", nullable:true})
    parentId: number;
}