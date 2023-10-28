import { authApi } from './auth/Auth.api'
import { districtsApi } from './districts/Districts.api'
import { groupsApi } from './groups/Groups.api'
import { regionsApi } from './region/Region.api'
import { usersApi } from './users/Users.api'

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

export const {
	useGetDistrictsQuery,
	useAddNewDistrictMutation,
	useEditDistrictMutation,
	useDeleteDistrictsMutation,
} = districtsApi

export const {
	useGetUsersQuery,
	useEditUserRoleMutation,
	useDeleteUserMutation,
} = usersApi
