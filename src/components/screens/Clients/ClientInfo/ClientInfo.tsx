import { Col, Descriptions, Row } from 'antd'
import React from 'react'
import { AiOutlinePhone } from 'react-icons/ai'
import { useParams, useNavigate } from 'react-router-dom'
import { UiButton } from 'src/components/ui'
import { useGetClientInfoQuery } from 'src/store/index.endpoints'

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
				items={[
					{
						key: '1',
						label: 'Имя',
						children: data?.data?.name,
					},
					{
						key: '2',
						label: 'Телефон',
						children: data?.data?.phone,
					},
					{
						key: '3',
						label: 'Регион',
						children: data?.data?.region?.name.ru,
					},
					{
						key: '4',
						label: 'Округ',
						children: data?.data?.district?.name.ru,
					},
					{
						key: '5',
						label: 'История звонков',
						children: (
							<div className='flex flex-col items-start gap-y-5 max-h-[500px] pr-2 overflow-auto'>
								{data?.data.call_history.map(item => (
									<Row className='flex items-center gap-x-5 text-xl border w-full p-3 rounded-md'>
										<AiOutlinePhone color='green' />
										<Col>{item?.name}</Col>
										<Col>{item?.service?.ru}</Col>
									</Row>
								))}
							</div>
						),
					},
				]}
			/>
		</div>
	)
}

export { ClientInfo }
