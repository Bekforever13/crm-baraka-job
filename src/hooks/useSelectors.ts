import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from 'src/store'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSelectors = () => {
	const { auth, shared, client, categories, regions } = useAppSelector(s => s)
	return { ...auth, ...shared, ...client, ...categories, ...regions }
}
