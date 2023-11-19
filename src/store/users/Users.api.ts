import { api } from '../index.api'
import { IGetDataParams } from '../shared/shared.types'
import { IUserDataResponse, TUserRole } from './Users.types'

export const usersApi = api.injectEndpoints({
	endpoints: builder => ({
		getUsers: builder.query<IUserDataResponse, IGetDataParams>({
			query: body => ({
				url: '/all-users',
				params: body,
			}),
			providesTags: ['users'],
		}),
		editUserRole: builder.mutation<unknown, TUserRole>({
			query: ({ userId, roleId }) => ({
				url: `/user/${userId}/attach-role/${roleId}`,
				method: 'POST',
			}),
			invalidatesTags: ['users'],
		}),
		deleteUser: builder.mutation<unknown, number>({
			query: id => ({
				url: `/user/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['users'],
		}),
	}),
})
