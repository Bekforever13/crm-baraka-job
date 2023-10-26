import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useActions } from 'src/hooks/useActions'
import { useLoginMutation } from 'src/store/index.endpoints'
import { ILoginDataBody } from 'src/store/auth/Auth.types'
import { MaskedInput } from 'antd-mask-input'
import { formatPhone } from 'src/utils/shared'
import { message } from 'antd'

const Login: React.FC = () => {
	const initialValues: ILoginDataBody = {
		phone: '',
		password: '',
	}
	const navigate = useNavigate()
	const { setAuth } = useActions()
	const [login, { data, isSuccess, isLoading, isError }] = useLoginMutation()

	const handleSubmit = async (values: ILoginDataBody) => {
		await login({ ...values, phone: formatPhone(values.phone) })
	}

	React.useEffect(() => {
		if (isSuccess && data) {
			localStorage.setItem('token', data?.token)
			setAuth(true)
			navigate('/')
		}
		if (isError) message.error('Произошла ошибка. Повторите попытку!')
	}, [isSuccess, isError])

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			<Form className='flex items-center justify-center h-screen bg-[#F5F2DF] flex-col gap-y-5'>
				<h1 className='font-bold text-xl'>Authorization</h1>
				<Field
					className='w-[300px] px-4 py-2 rounded-md border outline-none'
					type='phone'
					name='phone'
					placeholder='Phone'
					as={MaskedInput}
					mask='+{998} 00 000 00 00'
				/>
				<Field
					className='w-[300px] px-4 py-2 rounded-md border outline-none'
					type='password'
					name='password'
					placeholder='Password'
				/>
				<button
					className='w-[300px] p-3 border rounded-md bg-[#F4C95B] text-white font-bold '
					type='submit'
					disabled={isLoading}
				>
					{isLoading ? 'Загрузка...' : 'Войти'}
				</button>
				<ErrorMessage name='email' component='div' />
				<ErrorMessage name='password' component='div' />
			</Form>
		</Formik>
	)
}

export { Login }
