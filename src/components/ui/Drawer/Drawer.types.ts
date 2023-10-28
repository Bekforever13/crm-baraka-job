import { TItemData } from 'src/store/shared/shared.types'

export type TAddDrawerProps = {
	editData: TItemData | undefined
	isDrawerOpen: boolean
	setIsDrawerOpen: (el: React.SetStateAction<boolean>) => void
}

export type TSelectOptions = {
	value: string
	label: string
}
