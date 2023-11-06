import { api } from '../index.api'
import { TAddNewItem } from 'src/store/shared/shared.types'
import { IServiceDataResponse, TAddServiceData } from './Services.types'

export const servicesApi = api.injectEndpoints({
	endpoints: builder => ({
		getServices: builder.query<IServiceDataResponse, number>({
			query: (page = 1) => ({
				url: `/services?page=${page}`,
			}),
			providesTags: ['services'],
		}),
		addNewService: builder.mutation<unknown, TAddNewItem>({
			query: body => ({
				url: '/services',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['services'],
		}),
		editService: builder.mutation<unknown, TAddServiceData>({
			query: body => ({
				url: `/services/${body.id}`,
				method: 'PUT',
				body: { name: { ...body.name } },
			}),
			invalidatesTags: ['services'],
		}),
		deleteService: builder.mutation<unknown, number>({
			query: id => ({
				url: `/services/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['services'],
		}),
	}),
})
