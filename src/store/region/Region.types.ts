import { TItemData, TRegionWithDistricts } from "../shared/shared.types"

export type RegionInitState = {
	regionDrawer: boolean
	districtDrawer: boolean
	regionSearch: string
	districtEditData: TItemData | null
	regionID: number
	regionsData: TRegionWithDistricts[]
}
