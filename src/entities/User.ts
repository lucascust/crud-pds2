import { Entity, Column, PrimaryColumn, CreateDateColumn } from 'typeorm';
import { v4 as uuidV4 } from "uuid"

@Entity('users')
class User {
	@PrimaryColumn()
	id?: string;

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

	constructor() {
		if (!this.id){
			this.id = uuidV4();
		}
	}
}

export default User;
