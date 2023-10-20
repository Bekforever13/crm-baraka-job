import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISharedInitialState } from './shared.types'

const initialState: ISharedInitialState = {
	showDrawer: false,
}

const sharedSlice = createSlice({
	name: 'shared',
	initialState,
	reducers: {
		setShowDrawer(state, { payload }: PayloadAction<boolean>) {
			state.showDrawer = payload
		},
	},
})

export const { reducer, actions } = sharedSlice
