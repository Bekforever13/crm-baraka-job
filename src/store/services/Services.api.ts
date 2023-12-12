import { api } from '../index.api'
import { IGetDataParams, TAddNewItem } from 'src/store/shared/shared.types'
import { IServiceDataResponse, TAddServiceData } from './Services.types'

export const servicesApi = api.injectEndpoints({
	endpoints: builder => ({
		getServices: builder.query<IServiceDataResponse, IGetDataParams>({
			query: body => ({
				url: `/services`,
				params: body,
			}),
			providesTags: ['services', 'categories'],
		}),
		addNewService: builder.mutation<unknown, TAddNewItem>({
			query: body => ({
				url: '/services',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['services', 'categories'],
		}),
		editService: builder.mutation<unknown, TAddServiceData>({
			query: body => ({
				url: `/services/${body.id}`,
				method: 'PUT',
				body: { name: { ...body.name } },
			}),
			invalidatesTags: ['services', 'categories'],
		}),
		deleteService: builder.mutation<unknown, number>({
			query: id => ({
				url: `/services/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['services', 'categories'],
		}),
	}),
})
