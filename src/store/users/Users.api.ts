import { message } from 'antd'
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
			onQueryStarted: (_, { queryFulfilled }) => {
				try {
					queryFulfilled.catch((e: any) => {
						if (
							e.error.data.data.error === 'The phone has already been taken.'
						) {
							message.error('Данный телефон уже зарегистрирован')
						}
						if (
							e.error.data.data.error ===
							'The password field must be at least 8 characters.'
						) {
							message.error('Пароль должен быть не менее 8 символов')
						}
					})
				} catch (err) {
					console.log('error', err)
				}
			},
			invalidatesTags: ['users'],
		}),
	}),
})
