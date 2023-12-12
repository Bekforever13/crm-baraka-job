import { FC } from 'react'
import { Descriptions } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { UiButton } from 'src/components/ui'
import { useGetClientInfoQuery } from 'src/store/index.endpoints'
import { ClientInfoTable } from './ClientInfoTable'

// this component will show after /client/:id opened
const ClientInfo: FC = () => {
	// react hooks
	const { id } = useParams()
	const navigate = useNavigate()
	// rtk hooks
	const { data } = useGetClientInfoQuery(id)

	return (
		<div className='flex flex-col bg-white m-5 p-5 rounded-2xl'>
			<Descriptions
				title='Информация о пользователе'
				extra={<UiButton onClick={() => navigate(-1)}> Назад </UiButton>}
				layout='vertical'
				labelStyle={{ fontWeight: 700, color: '#000' }}
				items={[
					{
						key: '1',
						label: 'Имя',
						children: data?.data?.name || 'Не указан',
					},
					{
						key: '2',
						label: 'Телефон',
						children: data?.data?.phone || 'Не указан',
					},
					{
						key: '3',
						label: 'Регион',
						children: data?.data?.region?.name.ru || 'Не указан',
					},
					{
						key: '4',
						label: 'Округ',
						children: data?.data?.district?.name.ru || 'Не указан',
					},
				]}
			/>
			<div className='flex flex-col gap-y-5 mt-5'>
				<h3 className='font-bold'>История звонков:</h3>
				<ClientInfoTable dataSource={data?.data.call_history!} />
			</div>
		</div>
	)
}

export { ClientInfo }
