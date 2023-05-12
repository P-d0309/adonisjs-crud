import { DateTime } from "luxon"

export default interface UserInterface {
	id?: number,
	email: string
	first_name: string
	last_name: string
	password?: string
	rememberMeToken?: string
	profile?: string | null
	createdAt?: DateTime
	updatedAt?: DateTime
}
