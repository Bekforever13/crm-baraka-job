import { message } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { UiButton } from 'src/components/ui'
import { usePostImportMutation } from 'src/store/index.endpoints'

type TProps = {
	url: string
}

const Import: React.FC<TProps> = ({ url }) => {
	const [file, setFile] = useState<File | undefined>(undefined)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const [setImport, { isSuccess }] = usePostImportMutation()

	const handleButtonClick = () => fileInputRef?.current?.click()

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFile(e?.target?.files?.[0])
	}

	useEffect(() => {
		if (file) setImport({ url: url, file: file })
	}, [file])

	useEffect(() => message.success('Файл успешно импортирован'), [isSuccess])

	return (
		<div>
			<input
				ref={fileInputRef}
				type='file'
				style={{ display: 'none' }}
				onChange={handleFileChange}
			/>
			<UiButton type='primary' onClick={handleButtonClick}>
				Импорт
			</UiButton>
		</div>
	)
}

export { Import }
