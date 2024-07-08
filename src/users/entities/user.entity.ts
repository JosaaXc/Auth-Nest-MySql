import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    fullName: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'varchar', default: 'user'})
    roles: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

}
