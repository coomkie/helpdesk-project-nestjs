import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Issues} from "../issues/issues.entity";

@Entity()
export class Users {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 100, nullable: false})
    username: string;

    @Column({length: 150, nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({default: false})
    isAdmin: boolean;

    @OneToMany(() => Issues, issues => issues.user)
    issues: Issues[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}