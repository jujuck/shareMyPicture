import "reflect-metadata";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from "typeorm";
import { IsString } from "class-validator";

@Entity()
export class Images extends BaseEntity {
  @PrimaryColumn()
  @IsString()
  id: string;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  url: string;

  @Column()
  @IsString()
  tags: string;

  @Column()
  @IsString()
  description: string;

  @Column({ default: false })
  seen: Boolean;

  @CreateDateColumn()
  created_at: Date;
}
