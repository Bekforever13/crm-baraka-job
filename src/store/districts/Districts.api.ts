import { api } from '../index.api'
import {
	IItemDataResponse,
	TAddNewItem,
	TItemData,
} from 'src/store/shared/shared.types'

export const districtsApi = api.injectEndpoints({
	endpoints: builder => ({
		getDistricts: builder.query<IItemDataResponse, number | void>({
			query: page => ({
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
				body: { name: { ...body.name }, region_id: body.region_id },
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
