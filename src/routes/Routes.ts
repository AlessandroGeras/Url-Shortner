import { Request, Response } from 'express' 
import shortId from 'shortid'
import { config } from '../microservices/apiConfig'
import { URLModel } from '../model/URL'

export class Routes {
	public async fullurl(req: Request, response: Response): Promise<void> {
		const { originURL } = req.body
		const url = await URLModel.findOne({ originURL })
		if (url) {
			response.json(url)
			return
		}
		const hash = shortId.generate()
		const shortURL = `${config.Api_Url}/${hash}`
		const newURL = await URLModel.create({ hash, shortURL, originURL })
		response.json(newURL)
	}

	public async redirect(req: Request, response: Response): Promise<void> {
		const { hash } = req.params
		const url = await URLModel.findOne({ hash })

		if (url) {
			response.redirect(url.originURL)
			return
		}

		response.status(400).json({ error: 'URL not found' })
	}
}
