import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import UserInterface from 'App/Interface/UserInterface'

export default class UserSignUpPasswordMail extends BaseMailer {
	constructor(private user: UserInterface) {
		super()
	}

	public prepare(message: MessageContract) {
		message.subject('Your account has been created with us.').from('admin@example.com').to(this.user.email).htmlView('emails/user_password', { user: this.user })
	}
}
