import { TItemData, TRegionWithDistricts } from "../shared/shared.types"

export type RegionInitState = {
	regionSearch: string
	districtEditData: TItemData | null
	regionID: number
	regionsData: TRegionWithDistricts[]
}
