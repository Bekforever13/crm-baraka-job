import React from 'react'
import { Button, Drawer, Row, Space } from 'antd'
import { useSelectors } from 'src/hooks/useSelectors'
import { useActions } from 'src/hooks/useActions'
import { UiMultipleSelect, UiSelect } from '..'

const FilterDrawer: React.FC = () => {
	const { showDrawer } = useSelectors()
	const { setShowDrawer } = useActions()

	const onClose = () => {
		setShowDrawer(false)
	}

	return (
		<Drawer
			title='Фильтр'
			placement='right'
			onClose={onClose}
			open={showDrawer}
			extra={
				<Space>
					<Button onClick={onClose}>Отмена</Button>
					<Button onClick={onClose}>Применить</Button>
				</Space>
			}
		>
			<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
				Профессии:
				<UiMultipleSelect />
			</Row>
			<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
				Регион:
				<UiSelect />
			</Row>
			<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
				Город:
				<UiSelect />
			</Row>
			<Row className='my-5 flex flex-col gap-y-2' gutter={16}>
				МПЖ:
				<UiSelect />
			</Row>
		</Drawer>
	)
}

export { FilterDrawer }
