import React, { useEffect, useState } from 'react'
import { Input, Button } from '@nextui-org/react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../constants';

function LoginPage() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [color, setColor] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (Cookies.get('accessToken')) {
            navigate('/')
        }
    }, [])

    const formSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const response = await fetch(`${API_BASE_URL}/api/login/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        });

        setIsLoading(false)
        if (response.status === 200) {
            setError('')
            setColor('')
            setUsername('')
            setPassword('')
            const data = await response.json();
            Cookies.set('accessToken', data.access_token)
            navigate('/')
        }
        else {
            setError('Invalid username or password')
            setColor('danger')
            setPassword('')
        }
    }

    return (
        <div className='w-6/12 mx-auto mt-8'>
            <h1 className='text-2xl font-bold text-center m-3'>Login Page</h1>
            <form className="flex flex-col gap-4" onSubmit={formSubmit}>
                <Input isRequired label="Username" placeholder="Enter your username" type="text"
                    errorMessage={error}
                    color={color}
                    isInvalid={error ? true : false}
                    value={username} onChange={(e) => {
                        setUsername(e.target.value)
                        setError('')
                        setColor('')
                    }} />
                <Input
                    isRequired
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    color={color}
                    isInvalid={error ? true : false}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setError('')
                        setColor('')
                    }}
                />
                <div className="w-8 justify-between">
                    <Button fullWidth color="primary" type="submit" isLoading={isLoading} isDisabled={username.length > 0 && password.length > 0 ? false : true}>
                        Login
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
