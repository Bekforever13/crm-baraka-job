import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { RootState } from 'src/store'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useSelectors = () => {
	const { auth } = useAppSelector(s => s)
	const { shared } = useAppSelector(s => s)
	const { client } = useAppSelector(s => s)
	return { ...auth, ...shared, ...client }
}
