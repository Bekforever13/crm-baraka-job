import { Descriptions } from 'antd'
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { UiButton } from 'src/components/ui'
import { useGetClientInfoQuery } from 'src/store/index.endpoints'
import { ClientInfoTable } from './ClientInfoTable'

const ClientInfo: React.FC = () => {
	const { id } = useParams()
	const { data } = useGetClientInfoQuery(id)
	const navigate = useNavigate()

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
						children: `${data?.data?.first_name} ${data?.data?.last_name}`,
					},
					{
						key: '2',
						label: 'Телефон',
						children: data?.data?.phone,
					},
					{
						key: '3',
						label: 'Регион',
						children: data?.data?.region?.name.ru
							? data?.data?.region?.name.ru
							: 'Пусто',
					},
					{
						key: '4',
						label: 'Округ',
						children: data?.data?.district?.name.ru
							? data?.data?.district?.name.ru
							: 'Пусто',
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
