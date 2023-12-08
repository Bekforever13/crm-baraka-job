import { api } from '../index.api'
import { IGetDataParams, IRuKarUz } from 'src/store/shared/shared.types'
import { ICategoriesDataResponse, TServiceData } from './Categories.types'

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
		editCategories: builder.mutation<unknown, TServiceData>({
			query: body => ({
				url: `/categories/${body.id}`,
				method: 'PUT',
				body: { name: { ...body.name } },
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
