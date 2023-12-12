import { ICategoriesDataResponse } from "src/store/categories/Categories.types"

export type FilterDropdownProps = {
	setSelectedKeys: (values: React.Key[]) => void
	selectedKeys: React.Key[]
	confirm: () => void
	clearFilters: (() => void) | undefined
}

type FilterOption = {
	value: string
	label: string
}

export interface FilterDropdownPropsWithOptions extends FilterDropdownProps {
	options: FilterOption[]
	data?: ICategoriesDataResponse
}
