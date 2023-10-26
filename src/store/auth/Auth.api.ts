import { api } from '../index.api'
import { IAuthDataResponse, ILoginDataBody } from './Auth.types'

export const authApi = api.injectEndpoints({
	endpoints: builder => ({
		// checkUser: builder.query<TDataUser, void>({
		// 	query: () => ({
		// 		url: '/getme',
		// 	}),
		// 	providesTags: ['auth'],
		// }),
		login: builder.mutation<IAuthDataResponse, ILoginDataBody>({
			query: body => ({
				url: '/login',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['auth'],
		}),
	}),
})
