import { IsEmail, IsOptional, Max } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { Contact } from "./Contact.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ type: "varchar", length: 150 })
  @IsEmail()
  email: string;

  @OneToMany(() => Contact, (contact) => contact.user, { onDelete: "CASCADE" })
  contacts: Contact[]
}
