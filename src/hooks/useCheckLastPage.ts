import { useEffect, Dispatch, SetStateAction } from 'react'

type Props = {
	currentPage: number
	lastPage: number
	setCurrentPage: Dispatch<SetStateAction<number>>
}

const useCheckLastPage = ({ currentPage, lastPage, setCurrentPage }: Props) => {
	useEffect(() => {
		if (currentPage > lastPage) {
			setCurrentPage(lastPage)
		}
	}, [lastPage])
}

export { useCheckLastPage }
