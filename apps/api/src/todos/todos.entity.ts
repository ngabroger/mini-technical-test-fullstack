import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
export type TodoStatus = 'created' | 'completed' | 'on_going' | 'problem';

@Entity()
export class Todo{
    @PrimaryGeneratedColumn()
    id: number;
 
    @Column()
    title: string;

    @Column({type: 'enum', enum: ['created', 'completed', 'on_going', 'problem'], default: 'created'})
    status: TodoStatus;

    @Column({nullable: true})
    problem_desc: string;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date;
}