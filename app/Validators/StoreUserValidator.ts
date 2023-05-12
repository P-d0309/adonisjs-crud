import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class StoreUserValidator {
	constructor(protected ctx: HttpContextContract) { }

	public schema = schema.create({
		first_name: schema.string({}, [
			rules.maxLength(40),
			rules.minLength(5)
		]),
		last_name: schema.string({}, [
			rules.maxLength(40),
			rules.minLength(5)
		]),
		email: schema.string({}, [
			rules.unique({ table: 'users', column: "email", caseInsensitive: true }),
			rules.maxLength(40),
			rules.minLength(5),
			rules.email(),
		]),
		profile: schema.file({
			size: '5mb',
			extnames: ['jpg', 'gif', 'png'],
		})
	})

	public messages: CustomMessages = {}
}
