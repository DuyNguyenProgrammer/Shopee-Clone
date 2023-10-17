/* eslint-disable @typescript-eslint/no-unused-vars */
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { login, registerAccount } from 'src/apis/auth.api'
import Input from 'src/components/Input'
import { ResponseApi } from 'src/types/utils.type'
import { schema, Schema } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'

type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])

export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })
  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => login(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='px-4 mx-auto max-w-7xl'>
          <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
            <div className='lg:col-span-2 lg:col-start-4'>
              <form className='p-10 bg-white rounded shadow-sm' onSubmit={onSubmit} noValidate>
                <div className='text-2xl'>Đăng Nhập</div>
                <Input
                  name='email'
                  register={register}
                  type='email'
                  className='mt-8'
                  errorMessage={errors.email?.message}
                  placeholder='Email'
                />
                <Input
                  name='password'
                  register={register}
                  type='password'
                  className='mt-2'
                  errorMessage={errors.password?.message}
                  placeholder='Password'
                  autoComplete='on'
                />
                <div className='mt-3'>
                  <button className='w-full px-2 py-4 text-sm text-center text-white uppercase bg-red-500 hover:bg-red-600'>
                    Đăng nhập
                  </button>
                </div>
                <div className='flex items-center justify-center mt-8'>
                  <span className='text-gray-300'>Bạn mới biết đến Shopee?</span>
                  <Link className='ml-1 text-red-400' to='/register'>
                    Đăng ký
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
