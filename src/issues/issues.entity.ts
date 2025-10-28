import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Users} from "../users/users.entity";
import {IssueStatus} from "./issue-status.enum";

@Entity()
export class Issues {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 255, nullable: false})
    title: string;

    @Column({type: 'text', nullable: false})
    description: string;

    @Column({
        type: 'enum',
        enum: IssueStatus,
        default: IssueStatus.OPEN,
        nullable: false,
    })
    status: IssueStatus;

    @ManyToOne(() => Users, user => user.issues, {onDelete: 'CASCADE'})
    user: Users;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}