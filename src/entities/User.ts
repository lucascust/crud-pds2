import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
class User {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	username: string;

	@Column({ unique: true })
	email: string;

	@Column()
	password: string;

	@Column()
	phone: string;

	@Column()
	gender: string;

	@Column()
	birthdate: Date;

	@CreateDateColumn()
	created_at: Date;

	@CreateDateColumn()
	updated_at: Date;
}

export default User;
