import { api } from '../index.api'
import { IGetDataParams } from '../shared/shared.types'
import { IUserDataResponse, TNewAdminTypes, TUserRole } from './Users.types'

export const usersApi = api.injectEndpoints({
	endpoints: builder => ({
		getUsers: builder.query<IUserDataResponse, IGetDataParams>({
			query: body => ({
				url: '/admins',
				params: body,
			}),
			providesTags: ['users'],
		}),
		editUserRole: builder.mutation<unknown, TUserRole>({
			query: ({ userId, roleId }) => ({
				url: `/user/${userId}/role/${roleId}`,
				method: 'POST',
			}),
			invalidatesTags: ['users'],
		}),
		deleteUser: builder.mutation<unknown, number>({
			query: id => ({
				url: `/user/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['users', 'clients'],
		}),
		addNewAdmin: builder.mutation<unknown, TNewAdminTypes>({
			query: body => ({
				url: '/admins',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['users'],
		}),
	}),
})
