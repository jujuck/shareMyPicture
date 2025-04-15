import "reflect-metadata";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { IsString, MinLength } from "class-validator";

@Entity()
export class Images extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @IsString()
  @MinLength(3, {
    message: "Nom trop court",
  })
  name: string;

  @Column()
  @IsString()
  url: string;

  @Column()
  @IsString()
  tags: string;

  @Column()
  @IsString()
  orientation: string;

  @Column()
  @IsString()
  @MinLength(10, {
    message: "Merci d'étoffer la description",
  })
  description: string;

  @Column({ default: false })
  seen: Boolean;

  @CreateDateColumn()
  created_at: Date;
}
