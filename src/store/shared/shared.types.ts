export interface ISharedInitialState {
	showDrawer: boolean
	search: string
	categoriesSearch: string
	regionSearch: string
	districtSearch: string
	editData: TItemData | null
}

export interface IRuKarUz {
	kar: string
	uz_latin: string
	uz_kiril: string
	ru: string
	en: string
}

export type TItemData = {
	id: number
	name: IRuKarUz
	region_id?: number
}

export type TImport = {
	url: string
	file: File
}

export type TDistrictData = {
	region_id: number
	name: IRuKarUz
}

export type TAddNewItem = {
	name: IRuKarUz
}

export type TRegionWithDistricts = {
	id: number
	name: IRuKarUz
	districts: TItemData[]
}

export interface IRegionDataResponse {
	data: TRegionWithDistricts[]
	total: number
}

export interface IItemDataResponse {
	data: TItemData[]
	links: {
		first: string
		last: string
		next: string
	}
	meta: {
		current_page: number
		from: number
		last_page: number
		links: { active: boolean; label: string; url: string | null }[]
		path: string
		per_page: number
		to: number
		total: number
	}
}

export interface IGetDataParams {
	page: number
	search?: string
	limit?: number
}
