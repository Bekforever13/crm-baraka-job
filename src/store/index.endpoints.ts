import { authApi } from './auth/Auth.api'
import { regionsApi } from './region/Region.api'

export const { useLoginMutation } = authApi

export const {
	useGetRegionsQuery,
	useAddNewRegionMutation,
	useEditRegionMutation,
	useDeleteRegionMutation
} = regionsApi
