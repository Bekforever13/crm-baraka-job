import { authApi } from './auth/Auth.api'
import { clientsApi } from './clients/Clients.api'
import { categoriesApi } from './categories/Categories.api'
import { regionsApi } from './region/Region.api'
import { usersApi } from './users/Users.api'
import { sharedApi } from './shared/shared.api'
import { districtsApi } from './districts/Districts.api'
import { servicesApi } from './services/Services.api'

export const { useLoginMutation, useCheckUserQuery, useLogoutMutation } =
	authApi

export const {
	useGetRegionsQuery,
	useAddNewRegionMutation,
	useEditRegionMutation,
	useDeleteRegionMutation,
	useGetAllRegionsQuery,
} = regionsApi

export const {
	useGetCategoriesQuery,
	useGetAllCategoriesQuery,
	useAddNewCategoriesMutation,
	useEditCategoriesMutation,
	useDeleteCategoriesMutation,
} = categoriesApi

export const {
	useGetServicesQuery,
	useAddNewServiceMutation,
	useEditServiceMutation,
	useDeleteServiceMutation,
} = servicesApi

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
	useAddNewAdminMutation,
} = usersApi

export const { usePostImportMutation } = sharedApi

export const { useGetClientsQuery, useGetClientInfoQuery } = clientsApi
