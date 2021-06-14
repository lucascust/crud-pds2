import { Router } from 'express';
import { getRepository } from 'typeorm';

import User from '../entities/User';


const usersRouter = Router();

interface Request {
	username: string;
	email: string;
	password: string;
	birthdate: Date;
	gender: string;
	phone: string;
}


usersRouter.post('/', async (request, response) => {
	const userRepo = getRepository(User);
	const users = await userRepo.find();
	return response.json(users);
});

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

//ver perfil
usersRouter.post('/profile', async (request, response) => {
	const { username } = request.body;
	const userRepository = getRepository(User);
	const userProfile = await userRepository.findOne({ username });

	return response.json(userProfile);
});

// Rota editar usuário 
usersRouter.put('/edit', async (request, response) => {
	try {
		const {
			username,
			email,
			password,
			birthdate,
			gender,
			phone,
		} = request.body;

		const updated_at = new Date();

		const userRepository = getRepository(User);
		const userProfile = await userRepository.findOne({ email });
		const user_id = userProfile?.id;
		// Se encontrar um usuário com o ID no token, substitui as infos.
		// PS: Passar null não limpa o dado, apenas é ignorado.
		if (user_id) {
			await userRepository.save({
				id: user_id,
				username,
				password,
				email,
				birthdate,
				updated_at,
				gender,
				phone,
			});
		} else {
			throw new Error('Usuário não encontrado.');
		}


		const editedUser = await userRepository.findOne({ username });
		return response.status(200).json({ status: 1, editedUser });
	} catch (err) {
		return response
			.status(400)
			.json({ status: 0, errorName: err.name, errorMessage: err.message });
	}
});


// Rota deletar usuário 
usersRouter.post('/delete', async (request, response) => {
	try {
		const {
			email,
		} = request.body;

		const userRepository = getRepository(User);
		const userProfile = await userRepository.findOne({ email });

		// Se encontrar um usuário com o ID no token, substitui as infos.
		// PS: Passar null não limpa o dado, apenas é ignorado.
		if (userProfile) {
			await userRepository.delete({
				email,
			});
		} else {
			throw new Error('Usuário não encontrado.');
		}


		const editedUser = await userRepository.findOne({ email });
		return response.status(200).json({ status: 1, editedUser });
	} catch (err) {
		return response
			.status(400)
			.json({ status: 0, errorName: err.name, errorMessage: err.message });
	}
});



export default usersRouter;