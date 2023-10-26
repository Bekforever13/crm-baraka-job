import { authApi } from './auth/Auth.api'
import { groupsApi } from './groups/Groups.api'
import { regionsApi } from './region/Region.api'

export const { useLoginMutation } = authApi

export const {
	useGetRegionsQuery,
	useAddNewRegionMutation,
	useEditRegionMutation,
	useDeleteRegionMutation,
} = regionsApi

export const {
	useAddNewGroupMutation,
	useGetGroupsQuery,
	useEditGroupMutation,
	useDeleteGroupMutation,
} = groupsApi
