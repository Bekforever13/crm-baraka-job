import { CheckboxValueType } from "antd/es/checkbox/Group"

export type FilterDropdownProps = {
	setSelectedKeys: (values: CheckboxValueType[]) => void
	selectedKeys: CheckboxValueType[]
	confirm: () => void
	clearFilters: (() => void)
}

type FilterOption = {
	value: string
	label: string
}

export interface FilterDropdownPropsWithOptions extends FilterDropdownProps {
	options: FilterOption[]
}
