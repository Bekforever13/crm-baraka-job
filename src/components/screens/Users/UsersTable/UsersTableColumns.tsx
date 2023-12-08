import React from 'react'
import { message, Popconfirm, Select } from 'antd'
import {
	useDeleteUserMutation,
	useEditUserRoleMutation,
} from 'src/store/index.endpoints'
import { BiSolidTrash } from 'react-icons/bi'
import type { ColumnsType } from 'antd/es/table'
import {
	IAdminTypes,
	IUserDataResponse,
	TUserRole,
} from 'src/store/users/Users.types'

// prop types
type TProps = {
	data: IUserDataResponse | undefined
	setCurrentPage: (el: React.SetStateAction<number>) => void
}

// static data for select role
const roles = [
	{ value: 2, label: 'Админ' },
	{ value: 3, label: 'Рабочий' },
	{ value: 4, label: 'Клиент' },
]

const UsersTableColumns: (el: TProps) => ColumnsType<IAdminTypes> = ({
	data,
	setCurrentPage,
}) => {
	// rtk hooks
	const [deleteUser, { isSuccess }] = useDeleteUserMutation()
	const [changeRole, { isSuccess: changeRoleIsSuccess }] =
		useEditUserRoleMutation()

	// change role of admin
	const handleSelectRole = (e: TUserRole) => changeRole(e)

	// table columns
	const columns: ColumnsType<IAdminTypes> = [
		{
			title: 'Имя',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Телефон',
			dataIndex: 'phone',
			key: 'phone',
		},
		{
			title: 'Роль',
			dataIndex: 'role',
			key: 'role',
			width: 200,
			render: (el: string, rec) => (
				<Select
					style={{ width: '100%' }}
					value={
						(el === 'admin' && 'Админ') ||
						(el === 'worker' && 'Рабочий') ||
						(el === 'client' && 'Клиент') ||
						(el === 'user' && 'Пользователь')
					}
					onSelect={e => handleSelectRole({ userId: rec.id, roleId: String(e) })}
					options={roles}
				/>
			),
		},
		{
			title: 'Действия',
			dataIndex: 'actions',
			key: 'actions',
			render: (_, rec) => {
				return (
					<Popconfirm
						title='Удалить пользователя?'
						cancelText='Отмена'
						onConfirm={() => {
							if (data?.meta.total && data?.meta.total < 11) {
								setCurrentPage(1)
							}
							deleteUser(rec.id)
						}}
						okButtonProps={{ style: { backgroundColor: '#F4C95B' } }}
					>
						<BiSolidTrash className='cursor-pointer' size='22' color='red' />
					</Popconfirm>
				)
			},
		},
	]

	// success messages
	React.useEffect(() => {
		if (isSuccess) message.success('Пользователь успешно удалён.')
		if (changeRoleIsSuccess) {
			message.success('Роль пользователя успешно изменён')
		}
	}, [isSuccess, changeRoleIsSuccess])

	return columns
}

export { UsersTableColumns }
