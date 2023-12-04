import { api } from '../index.api'
import { IDataResponseClient } from '../users/Users.types'
import { IClientDataResponse, IClientsParams } from './Client.types'

export const clientsApi = api.injectEndpoints({
	endpoints: builder => ({
		getClients: builder.query<IDataResponseClient, IClientsParams>({
			query: body => ({
				url: `/clients`,
				params: body,
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
