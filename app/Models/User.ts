import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, computed } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public email: string

	@column()
	public first_name: string

	@column()
	public last_name: string

	@column({ serializeAs: null })
	public password: string

	@column()
	public rememberMeToken: string | null

	@column()
	public profile: string | null

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	// Computed properties
	@computed()
	public get fullName() {
		return `${this.first_name} ${this.last_name}`
	}

	profilePath = "assets/users/profile";

	@beforeSave()
	public static async hashPassword(user: User) {
		if (user.$dirty.password) {
			user.password = await Hash.make(user.password)
		}

		if (user.$dirty.email) {
			user.email = user.$dirty.email.toLowerCase()
		}
	}
}
