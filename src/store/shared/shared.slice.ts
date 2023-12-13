import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISharedInitialState, TItemData } from './shared.types'

const initialState: ISharedInitialState = {
	search: '',
	districtSearch: '',
	editData: null,
	usersDrawer: false,
}

const sharedSlice = createSlice({
	name: 'shared',
	initialState,
	reducers: {
		setUsersDrawer(state, { payload }: PayloadAction<boolean>) {
			state.usersDrawer = payload
		},
		setEditData(state, { payload }: PayloadAction<TItemData | null>) {
			state.editData = payload
		},
		setSearch(state, { payload }: PayloadAction<string>) {
			state.search = payload
		},
		setDistrictSearch(state, { payload }: PayloadAction<string>) {
			state.districtSearch = payload
		},
	},
})

export const { reducer, actions } = sharedSlice
