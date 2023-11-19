import { authApi } from './auth/Auth.api'
import { clientsApi } from './clients/Clients.api'
import { districtsApi } from './districts/Districts.api'
import { servicesApi } from './services/Services.api'
import { regionsApi } from './region/Region.api'
import { usersApi } from './users/Users.api'
import { sharedApi } from './shared/shared.api'

export const { useLoginMutation, useCheckUserQuery } = authApi

export const {
	useGetRegionsQuery,
	useAddNewRegionMutation,
	useEditRegionMutation,
	useDeleteRegionMutation,
} = regionsApi

export const {
	useAddNewServiceMutation,
	useGetServicesQuery,
	useEditServiceMutation,
	useDeleteServiceMutation,
} = servicesApi

export const {
	useGetDistrictsQuery,
	useAddNewDistrictMutation,
	useEditDistrictMutation,
	useDeleteDistrictsMutation,
	useGetOneDistrictQuery,
} = districtsApi

export const {
	useGetUsersQuery,
	useEditUserRoleMutation,
	useDeleteUserMutation,
} = usersApi

export const { usePostImportMutation } = sharedApi

export const { useGetClientsQuery, useGetClientInfoQuery } = clientsApi
