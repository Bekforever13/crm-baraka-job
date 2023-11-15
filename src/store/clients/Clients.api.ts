import { api } from '../index.api'
import { IUserDataResponse } from '../users/Users.types'
import { IClientDataResponse, IClientsParams } from './Client.types'

export const clientsApi = api.injectEndpoints({
	endpoints: builder => ({
		getClients: builder.query<IUserDataResponse, IClientsParams>({
			query: body => ({
				url: `/clients?
				${body?.search?.length ? `search=${body.search}&` : ''}
				${body.id ? `role_id=${body.id}&` : ''}
				${body.page ? `page=${body.page}&` : ''},
				${body.limit ? `limit=${body.limit}&` : ''}`,
			}),
			providesTags: ['clients'],
		}),
		getClientInfo: builder.query<IClientDataResponse, string | void>({
			query: id => ({
				url: `/clients/${id}`,
			}),
		}),
	}),
})
