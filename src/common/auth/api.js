import wretch from 'wretch'
import { storage } from '../storage'

export const loginApi = () => {
	return wretch()
		.url(import.meta.env.VITE_REST_API_URL + '/login/test')
        .headers({'Content-Type': 'application/json'})
		.get()
		.error(400, (error) => {
            return (JSON.parse(error.message))
        })
		.json((response) => {
			return response
		}
	)
}

export const getUserApi = () => {
	return wretch()
		.url(import.meta.env.VITE_REST_API_URL + '/profile')
		.headers({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + storage.getToken()
		})
		.get()
		.error(400, (error) => {
			return (JSON.parse(error.message))
		})
		.error(401, (error) => {
			console.log('Unauthorized')
			return (JSON.parse(error.message))
		})
		.json((response) => {
			return response
		}
	)
}