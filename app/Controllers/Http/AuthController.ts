import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
	public async login(ctx: HttpContextContract) {
		return ctx.view.render('auth.login')
	}

	public async storeLogin({ request, response, auth, session }: HttpContextContract) {
		await request.validate(LoginValidator)

		const email = request.input('email')
		const password = request.input('password')

		try {
			await auth.use('web').attempt(email, password)
			return response.redirect().toRoute('auth.dashboard')
		} catch (error) {
			session.flash({
				errors: {
					email: "Your credentials does not match our records"
				},
				email
			})
			return response.redirect().back()
		}
	}

	public async logout({auth , response}: HttpContextContract) {
		auth.logout()

		return response.redirect().toRoute('login')
	}
}
