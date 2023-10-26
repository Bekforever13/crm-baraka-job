import { api } from '../index.api'
import {
	IItemDataResponse,
	TAddNewItem,
	TItemData,
} from 'src/store/shared/shared.types'

export const districtsApi = api.injectEndpoints({
	endpoints: builder => ({
		getDistricts: builder.query<IItemDataResponse, number>({
			query: (page = 1) => ({
				url: `/districts?page=${page}`,
			}),
			providesTags: ['districts'],
		}),
		addNewDistrict: builder.mutation<unknown, TAddNewItem>({
			query: body => ({
				url: '/districts',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['districts'],
		}),
		editDistrict: builder.mutation<unknown, TItemData>({
			query: body => ({
				url: `/districts/${body.id}`,
				method: 'PUT',
				body: { name: { ...body.name } },
			}),
			invalidatesTags: ['districts'],
		}),
		deleteDistricts: builder.mutation<unknown, number>({
			query: id => ({
				url: `/districts/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['districts'],
		}),
	}),
})
