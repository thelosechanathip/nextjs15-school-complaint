import FormLogin from '@/components/auth/FormLogin';
import React from 'react'

const LoginPage = () => {
    return (
        <div className="container mx-auto min-h-screen flex items-center justify-center">
            <div className='bg-white p-8 rounded-lg shadow-lg text-center'>
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Login</h1>
                <div className="mt-10">
                    <FormLogin />
                </div>
            </div>
        </div>
    )
}

export default LoginPage;