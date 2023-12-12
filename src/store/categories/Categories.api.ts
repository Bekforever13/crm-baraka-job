import { api } from '../index.api'
import { IGetDataParams, IRuKarUz } from 'src/store/shared/shared.types'
import { ICategoriesDataResponse } from './Categories.types'
import { TAddServiceData } from '../services/Services.types'

export const categoriesApi = api.injectEndpoints({
	endpoints: builder => ({
		getCategories: builder.query<ICategoriesDataResponse, IGetDataParams>({
			query: body => ({
				url: `/categories`,
				params: body,
			}),
			providesTags: ['categories'],
		}),
		addNewCategories: builder.mutation<unknown, { name: IRuKarUz }>({
			query: body => ({
				url: '/categories',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['categories'],
		}),
		editCategories: builder.mutation<unknown, TAddServiceData>({
			query: body => ({
				url: `/categories/${body.id}`,
				method: 'PUT',
				body: { name: body.name },
			}),
			invalidatesTags: ['categories'],
		}),
		deleteCategories: builder.mutation<unknown, number>({
			query: id => ({
				url: `/categories/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['categories'],
		}),
	}),
})
