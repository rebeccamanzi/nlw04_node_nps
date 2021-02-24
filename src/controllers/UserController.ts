import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../models/User';

class UserController {
  async create (request: Request, response: Response) {
    const { name, email } = request.body;
    
    // Repositório -> permite ações no banco de dados
    const userRepository = getRepository(User);

    // Verificar se já existe um usuário cadastrado com este e-mail
    // Como se fosse uma query: SELECT * FROM USERS WHERE EMAIL = "EMAIL"
    // findOne -> retorna 1 registro
    const userAlredyExists = await userRepository.findOne({
      email
    });

    if(userAlredyExists) {
      return response.status(400).json({
        error: "User alredy exists!"
      })
    }

    // Criação de usuário
    const user = userRepository.create({
      name, email
    })

    // Salvar usuário
    await userRepository.save(user);

    return response.json(user);
  }
}

export { UserController }