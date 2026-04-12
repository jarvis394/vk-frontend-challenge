export const API_URL = 'https://api.thecatapi.com/v1'
export const API_KEY = import.meta.env.VITE_API_KEY

if (!API_KEY) {
	console.warn('No API key found in .env, results will be limited to 10')
}
