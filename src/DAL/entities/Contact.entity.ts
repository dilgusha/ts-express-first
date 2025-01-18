import { IsEmail, IsEnum, IsOptional, Length } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User.entity";

export enum EInquiryType {
    PARTNERSHIP = "PARTNERSHIP",
    INVESTMENT = "INVESTMENT",
    GENERAL = "GENERAL",
}

@Entity({ name: "contacts" })
export class Contact extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 150 })
    @Length(3,50)
    name: string;

    @Column({ type: "varchar", length: 150 })
    @IsOptional()
    surname: string;

    @Column({ type: "varchar", length: 150, unique: true })
    @IsEmail()
    email: string;

    @Column({ type: "varchar", length: 150 })
    companyName: string;

    @Column({
        type: "enum",
        enum: EInquiryType,
        default: EInquiryType.GENERAL,
    })
    @IsOptional()
    @IsEnum(EInquiryType)
    inquiryType: EInquiryType;

    @Column({ type: "text" })
    message: string;

    @CreateDateColumn({ type: "datetime" })
    created_at: Date;

    @UpdateDateColumn({ type: "datetime" })
    updated_at: Date;

    @DeleteDateColumn({ type: "datetime", nullable: true })
    deleted_at: Date;


    @ManyToOne(()=>User,(user)=>user.contacts)
    user:User
}