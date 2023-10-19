import { bindActionCreators } from '@reduxjs/toolkit'
import React from 'react'
import { useDispatch } from 'react-redux'
import { actions as auth } from 'src/store/auth/Auth.slice'
import { actions as shared } from 'src/store/shared/shared.slice'

const rootActions = {
	...auth,
	...shared,
}

export const useActions = () => {
	const dispatch = useDispatch()
	return React.useMemo(
		() => bindActionCreators(rootActions, dispatch),
		[dispatch]
	)
}
