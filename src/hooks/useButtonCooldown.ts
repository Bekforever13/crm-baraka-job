import { useState, useEffect } from 'react'

export const useButtonCooldown = (initialState: boolean, cooldown: number) => {
	const [isButtonDisabled, setButtonDisabled] = useState(initialState)

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>
		if (isButtonDisabled) {
			timer = setTimeout(() => {
				setButtonDisabled(false)
			}, cooldown)
		}
		return () => {
			clearTimeout(timer)
		}
	}, [isButtonDisabled, cooldown])

	return [isButtonDisabled, setButtonDisabled] as const
}
