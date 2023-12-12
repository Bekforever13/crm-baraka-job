import { api } from '../index.api'
import {
	IGetDataParams,
	IItemDataResponse,
	TAddNewItem,
	TItemData,
} from 'src/store/shared/shared.types'

export const districtsApi = api.injectEndpoints({
	endpoints: builder => ({
		getDistricts: builder.query<IItemDataResponse, IGetDataParams>({
			query: body => ({
				url: '/districts',
				params: body,
			}),
			providesTags: ['districts', 'regions'],
		}),
		getOneDistrict: builder.query<IItemDataResponse, number>({
			query: id => ({
				url: `/districts/${id}`,
			}),
		}),
		addNewDistrict: builder.mutation<unknown, TAddNewItem>({
			query: body => ({
				url: '/districts',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['districts', 'regions'],
		}),
		editDistrict: builder.mutation<unknown, TItemData>({
			query: body => ({
				url: `/districts/${body.id}`,
				method: 'PUT',
				body: {name: body.name, region_id: body.region_id},
			}),
			invalidatesTags: ['districts', 'regions'],
		}),
		deleteDistricts: builder.mutation<unknown, number>({
			query: id => ({
				url: `/districts/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['districts', 'regions'],
		}),
	}),
})
