import { TRegion } from 'src/store/region/Region.types'

export type TAddRegionDrawerProps = {
	editData: TRegion | undefined
	isDrawerOpen: boolean
	setIsDrawerOpen: (el: React.SetStateAction<boolean>) => void
}
