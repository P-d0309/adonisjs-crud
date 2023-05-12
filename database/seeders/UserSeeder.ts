import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserService from 'App/Services/UserService'
import { faker } from '@faker-js/faker';
import UserInterface from '../../app/Interface/UserInterface';

export default class extends BaseSeeder {
	public async run() {
		Array.from({ length: 10 }).forEach(async () => {
			const User: UserInterface  = {
				first_name: faker.name.firstName(),
				last_name: faker.name.lastName(),
				email: faker.internet.email(),
				password: 'Admin@123'
			}
			await UserService.create(User)
		})
	}
}
