// import { api } from '../index.api'
// import { ILogin, IResultType, TDataUser } from './Auth.types'

// export const authApi = api.injectEndpoints({
// 	endpoints: builder => ({
// 		checkUser: builder.query<TDataUser, void>({
// 			query: () => ({
// 				url: '/getme',
// 			}),
// 			providesTags: ['auth']
// 		}),
// 		login: builder.mutation<IResultType, ILogin>({
// 			query: body => ({
// 				url: '/login',
// 				method: 'POST',
// 				body,
// 			}),
// 			invalidatesTags: ['auth', 'words', 'categories'],
// 		}),
// 	}),
// })
