
import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeChildren, TreeParent } from 'typeorm';

@Entity()
export class Category {
    @PrimaryGeneratedColumn({name: "id"})
    id: number;

    @Column({name: "name"})
    name: string;

    @Column({name: "parent_id", nullable:true})
    parentId: number;

    validate() {

    }
}
