import { TheCatAPI } from '@thatapicompany/thecatapi'
import { API_KEY, API_URL } from './constants'

export const api = new TheCatAPI(API_KEY, {
	host: API_URL
})
