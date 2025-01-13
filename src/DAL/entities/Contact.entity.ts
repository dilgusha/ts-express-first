import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum EInquiryType {
    PARTNERSHIP = "PARTNERSHIP",
    INVESTMENT = "INVESTMENT",
    GENERAL = "GENERAL",
}

@Entity({ name: "contacts" })
export class Contact {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 150 })
    name: string;

    @Column({ type: "varchar", length: 150 })
    surname: string;

    @Column({ type: "varchar", length: 150, unique: true })
    email: string;

    @Column({ type: "varchar", length: 150 })
    companyName: string;

    @Column({
        type: "enum",
        enum: EInquiryType,
        default: EInquiryType.GENERAL,
    })
    inquiryType: EInquiryType;

    @Column({ type: "text" })
    message: string;

    @CreateDateColumn({ type: "datetime" })
    created_at: Date;

    @UpdateDateColumn({ type: "datetime" })
    updated_at: Date;

    @DeleteDateColumn({ type: "datetime", nullable: true })
    deleted_at: Date;
}