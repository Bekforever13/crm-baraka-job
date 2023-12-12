import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RegionInitState } from './Region.types'
import { TItemData, TRegionWithDistricts } from '../shared/shared.types'

const initialState: RegionInitState = {
	regionSearch: '',
	districtEditData: null,
	regionID: 0,
	regionsData: [],
}

const regionSlice = createSlice({
	name: 'shared',
	initialState,
	reducers: {
		setRegionSearch(state, { payload }: PayloadAction<string>) {
			state.regionSearch = payload
		},
		setDistrictEditData(state, { payload }: PayloadAction<TItemData | null>) {
			state.districtEditData = payload
		},
		setRegionID(state, { payload }: PayloadAction<number>) {
			state.regionID = payload
		},
		setRegionsData(state, { payload }: PayloadAction<TRegionWithDistricts[]>) {
			state.regionsData = payload
		},
	},
})

export const { reducer, actions } = regionSlice
