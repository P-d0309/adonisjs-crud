import Application from '@ioc:Adonis/Core/Application'
import { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser';

export default class FileHelper {
	public static async uploadFile(file: MultipartFileContract, path: string = 'assets') : Promise<string | null> {

		await file.moveToDisk(path)

		console.log(file.toJSON())
		const fileName = file.toJSON()['fileName'];
		if (fileName) {
			return fileName
		}else {
			return null
		}
	}
}
