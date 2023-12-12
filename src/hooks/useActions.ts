import { bindActionCreators } from '@reduxjs/toolkit'
import React from 'react'
import { useDispatch } from 'react-redux'
import { actions as auth } from 'src/store/auth/Auth.slice'
import { actions as shared } from 'src/store/shared/shared.slice'
import { actions as client } from 'src/store/clients/Client.slice'
import { actions as categories } from 'src/store/categories/Categories.slice'
import { actions as regions } from 'src/store/region/Region.slice'

const rootActions = {
	...auth,
	...shared,
	...client,
	...categories,
	...regions,
}

export const useActions = () => {
	const dispatch = useDispatch()
	return React.useMemo(
		() => bindActionCreators(rootActions, dispatch),
		[dispatch]
	)
}
