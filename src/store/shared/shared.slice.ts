import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISharedInitialState } from './shared.types'

const initialState: ISharedInitialState = {
	showDrawer: false,
	search: '',
}

const sharedSlice = createSlice({
	name: 'shared',
	initialState,
	reducers: {
		setShowDrawer(state, { payload }: PayloadAction<boolean>) {
			state.showDrawer = payload
		},
		setSearch(state, { payload }: PayloadAction<string>) {
			state.search = payload
		},
	},
})

export const { reducer, actions } = sharedSlice
