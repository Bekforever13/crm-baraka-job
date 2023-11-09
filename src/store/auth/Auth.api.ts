import { api } from '../index.api'
import { IUser } from '../users/Users.types'
import { IAuthDataResponse, ILoginDataBody } from './Auth.types'

export const authApi = api.injectEndpoints({
	endpoints: builder => ({
		checkUser: builder.query<{ data: IUser }, string>({
			query: token => {
				if (!token) {
					throw new Error('Token is required for this request')
				}
				return {
					url: '/get-me',
				}
			},
		}),
		login: builder.mutation<IAuthDataResponse, ILoginDataBody>({
			query: body => ({
				url: '/login',
				method: 'POST',
				body,
			}),
		}),
	}),
})
