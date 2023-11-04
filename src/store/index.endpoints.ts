import { authApi } from './auth/Auth.api'
import { clientsApi } from './clients/Clients.api'
import { districtsApi } from './districts/Districts.api'
import { groupsApi } from './services/Services.api'
import { regionsApi } from './region/Region.api'
import { usersApi } from './users/Users.api'

export const { useLoginMutation, useCheckUserQuery } = authApi

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
	useGetOneDistrictQuery
} = districtsApi

export const {
	useGetUsersQuery,
	useEditUserRoleMutation,
	useDeleteUserMutation,
} = usersApi

export const { useGetClientsQuery, useGetClientInfoQuery } = clientsApi
