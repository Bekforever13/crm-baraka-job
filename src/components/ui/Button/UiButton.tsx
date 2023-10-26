import { Button, ButtonProps } from 'antd'
import React from 'react'

const UiButton: React.FC<ButtonProps> = _props => {
	return <Button {..._props} className='bg-[#689c56] text-white' />
}

export { UiButton }
