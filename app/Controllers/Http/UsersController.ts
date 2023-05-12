import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FileHelper from 'App/Helpers/FileHelper'
import UserMapper from 'App/Mappers/UserMapper'
import User from 'App/Models/User'
import UserService from 'App/Services/UserService'
import StoreUserValidator from 'App/Validators/StoreUserValidator'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import Drive from '@ioc:Adonis/Core/Drive';
import { filePaths } from 'Config/filepaths'

export default class UsersController {
	public async index(ctx: HttpContextContract) {
		const users = await UserService.getUsersByPagination(ctx, 10)

		return ctx.view.render('users.index', { users })
	}

	public async create({ view }: HttpContextContract) {
		return view.render('users.create')
	}

	public async store({ request, response, session }: HttpContextContract) {
		await request.validate(StoreUserValidator)


		const profileImage = request.file('profile')

		let file : string | null = null;

		if(profileImage) {
			const uploadPath = User.prototype.profilePath;
			file = await FileHelper.uploadFile(profileImage,  uploadPath)
		}
		const data = UserMapper.storeUser(request, file);
		const user = await UserService.create(data)

		session.flash({
			message: {
				level: 'success',
				content: `User ${user.fullName} added successfully.`
			}
		})

		response.redirect().toRoute('auth.users.index')
	}

	public async show({ }: HttpContextContract) { }

	public async edit({ params, view }: HttpContextContract) {
		const user = await UserService.getById(params.id);
		let fileUrl = '';

		if (user.profile) {
			const profilePath = filePaths.userProfileBase

			fileUrl = await Drive.getUrl(`${profilePath}/${user.profile}`)
		}
		return view.render('users.edit', { user, fileUrl })
	}

	public async update({ request, params, response, session }: HttpContextContract) {
		await request.validate(UpdateUserValidator)
		const profileImage = request.file('profile')

		let file : string | null = request.input('current_profile');

		if(profileImage) {
			const uploadPath = filePaths.userProfileBase;

			file = await FileHelper.uploadFile(profileImage,  uploadPath)
		}

		const user = UserMapper.storeUser(request, file);
		await UserService.updateById(params.id, user)

		session.flash({
			message: {
				level: 'success',
				content: "User updated successfully"
			}
		})
		return response.redirect().toRoute('auth.users.index')
	}

	public async destroy({ params, response, session }: HttpContextContract) {
		await UserService.deleteById(params.id)

		session.flash({
			message: {
				level: 'success',
				content: "User deleted successfully"
			}
		})

		return response.send({})
	}
}
