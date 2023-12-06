import { TItemData } from 'src/store/shared/shared.types'

export interface ITableProps {
	setEditData: (el: React.SetStateAction<TItemData | undefined>) => void
	setIsDrawerOpen: (el: React.SetStateAction<boolean>) => void
}
