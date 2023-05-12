import UserInterface from "App/Interface/UserInterface";
import User from "App/Models/User";
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import UserSignUpPasswordMail from "App/Mailers/UserSignUpPasswordMail";

export default class UserService {
	public static async create(data: UserInterface) {
		try {
			const user = await User.create(data)

			await new UserSignUpPasswordMail(data).send()
			return user
		} catch (error) {
			return error
		}
	}

	public static async getUsersByPagination(ctx: HttpContextContract, limit: number = 10) {
		try {
			const page = ctx.request.input('page', 1)
			return (await User.query().orderBy('id', 'desc').paginate(page, limit)).baseUrl('/users/index')
		} catch (error) {
			return error
		}
	}

	public static async getById(id: number) : Promise<User> {
		try {
			return await User.findOrFail(id)
		} catch (error) {
			return error
		}
	}

	public static async updateById(id: number, user : UserInterface) {
		try {
			return await User.query().where('id' , id).update(user)
		} catch (error) {
			return error
		}
	}

	public static async deleteById(id: number) {
		try {
			await User.query().where('id', id).delete()
		} catch (error) {
			return error
		}
		return true
	}
}
