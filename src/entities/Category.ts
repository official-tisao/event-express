
import { Entity, PrimaryGeneratedColumn, Column, Tree, TreeChildren, TreeParent } from 'typeorm';
import { CustomException } from '../exceptions/CustomException';
// import {Transform} from "node:stream";
// import { Transform } from 'class-transformer';

// let transform = Transform((name: string) => {
//     if (!name || name.trim() === '') {
//         throw new CustomException('Name cannot be null, empty, or just whitespace', 400);
//     }
//             // this.name = name.trim();
//     return name;
// });

@Entity()
export class Category {
    @PrimaryGeneratedColumn({name: "id"})
    id: number;

    @Column({
        name: "name",
        nullable: false,
        transformer: {
          to: (value: string) => {
            if (!value || value.trim() === '') {
              throw new CustomException('Name cannot be null/empty', 400);
            }
            return value.trim();
          },
          from: (value: string) => value
        }
      })
    name!: string;

    @Column({name: "parent_id", nullable:true})
    parentID?: number;

}
