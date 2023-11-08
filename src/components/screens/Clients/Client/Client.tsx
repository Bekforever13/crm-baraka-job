import { Col, Descriptions, Row } from 'antd'
import React from 'react'
import { AiOutlinePhone } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { useGetClientInfoQuery } from 'src/store/index.endpoints'

const Client: React.FC = () => {
	const { id } = useParams()
	const { data } = useGetClientInfoQuery(id)
	return (
		<div className='flex flex-col bg-white m-5 p-5 rounded-2xl'>
			<Descriptions
				title='User Info'
				layout='vertical'
				items={[
					{
						key: '1',
						label: 'Имя',
						children: data?.data.name,
					},
					{
						key: '2',
						label: 'Телефон',
						children: data?.data.phone,
					},
					{
						key: '3',
						label: 'Регион',
						children: data?.data.region.ru,
					},
					{
						key: '4',
						label: 'Округ',
						children: data?.data.district.ru,
					},
					{
						key: '5',
						label: 'История звонков',
						children: (
							<div className='flex flex-col items-start gap-y-5 max-h-[500px] pr-2 overflow-auto'>
								{data?.data.call_history.map(item => (
									<Row className='flex items-center gap-x-5 text-xl border w-full p-3 rounded-md'>
										<AiOutlinePhone color='green' />
										<Col>{item.name}</Col>
										<Col>{item.service.ru}</Col>
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

export { Client }
