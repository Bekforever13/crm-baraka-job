import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISharedInitialState } from './shared.types'

const initialState: ISharedInitialState = {
	showDrawer: false,
	limit: 10,
	filter: {
		group: [''],
		region: '',
		district: '',
	},
}

const sharedSlice = createSlice({
	name: 'shared',
	initialState,
	reducers: {
		setLimit(state, { payload }: PayloadAction<number>) {
			state.limit = payload
		},
		setShowDrawer(state, { payload }: PayloadAction<boolean>) {
			state.showDrawer = payload
		},
		setFilter(
			state,
			{ payload }: PayloadAction<ISharedInitialState['filter']>
		) {
			state.filter = payload
		},
	},
})

export const { reducer, actions } = sharedSlice
