import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../entities/User';


const usersRouter = Router();

interface Request {
	username: string;
	email: string;
	password: string;
	avatar: string;
	birthdate: Date;
	gender: string;
	phone: string;
}

// Rota para cadastro
usersRouter.post('/signup', async (request, response) => {
	try {
		const {
			username,
			email,
			password,
			birthdate,
			gender,
			phone,
		} = request.body;

		const created_at = new Date();
		const updated_at = new Date();

        const userRepository = getRepository(User);

        const userData = userRepository.create({
			username,
			email,
			password,
			birthdate,
			gender,
			phone,
            created_at,
			updated_at,
		});

		// Efetivamente salva o usuario no banco de dados
		await userRepository.save(userData);

		const user = await userRepository.findOne({ where: { email } });

        if (user!.id != '') {
			return response.status(200).json({ message: "Cadastro Realizado com Sucesso." });
        }

	} catch (err) {
		return response
			.status(400)
			.json({ status: 0, errorName: err.name, errorMessage: err.message });
	}
});

export default usersRouter;