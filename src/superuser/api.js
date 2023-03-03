import wretch from 'wretch'
import { storage } from '../common/storage'

export const getAllAssignedStaffApi = () => {
	return wretch()
		.url(import.meta.env.VITE_REST_API_URL + '/role/assigned')
		.headers({
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + storage.getToken()
		})
		.get()
		.error(400, (error) => {
			return (JSON.parse(error.message))
		})
		.json((response) => {
			return response
		}
	)
}