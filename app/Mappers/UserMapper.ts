import { RequestContract } from '@ioc:Adonis/Core/Request';
import UserInterface from 'App/Interface/UserInterface'
import { string } from '@ioc:Adonis/Core/Helpers'


export default class UserMapper {
	public static storeUser(request : RequestContract, file : string | null = null): UserInterface {
		return {
			first_name: request.input('first_name'),
			last_name: request.input('last_name'),
			email: request.input('email'),
			profile: file,
			password: string.generateRandom(8)
		}
	}
}
