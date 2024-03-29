import { useState, useEffect } from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { login, reset } from "../features/auth/authSlice";
import Spinner from './Spinner'

function LoginForm() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {  email, password } = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector( (state) => state.auth )

    useEffect(() => {
      if (isError) {
        toast.error(message)
      }
      if (isSuccess) {
        toast.success("Login Success")
        navigate('/')
      }
    
      dispatch(reset())
    }, [user, isError, isSuccess, message, dispatch, navigate])
    // if (user) {
    //   navigate('/')
    // }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    // const onChange = (event) => {
    //     setFormData({ ...formData, [event.target.name]: event.target.value })
    // }
    const onSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }

    if(isLoading) {
        return <Spinner />
    }

  return (
    <>
    <section className="heading">
        <h1>
            <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
    </section>
    <section className="form">
        <form onSubmit={onSubmit}>
             <div className="form-group">
                <input type="text" 
                className="form-control" 
                id='email' 
                name='email'
                value={email} 
                placeholder='Please enter your email'
                onChange={onChange} />
            </div>
             <div className="form-group">
                <input type="password" 
                className="form-control" 
                id='password' 
                name='password'
                value={password}
                placeholder='Enter password'
                onChange={onChange} />
            </div>
            <div className="form-group">
                <button type="submit" className='btn btn-block'>Submit</button>
            </div>
        </form>
    </section>
    </>
  )
}

export default LoginForm