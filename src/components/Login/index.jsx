import {useState} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'

import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isSuccessError, setIsSuccessError] = useState(false)
  const [isShowPassword, setIsShowPassword] = useState(false)

  const navigate = useNavigate()

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    navigate('/', {replace: true})
  }

  const onSubmitFailure = failureMsg => {
    const firstLetter = failureMsg.charAt(0)
    const remainingLetters = failureMsg.substring(1)
    const capitalizedFirstLetter = firstLetter.toUpperCase()
    const capitalizedWord = capitalizedFirstLetter + remainingLetters
    setIsSuccessError(true)
    setErrorMsg(capitalizedWord)
  }

  const onSubmitLoginForm = async event => {
    event.preventDefault()
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const onClickShowPassword = () => {
    setIsShowPassword(prevValue => !prevValue)
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />
  }

  const inputType = isShowPassword ? 'text' : 'password'

  return (
    <div className="login-container">
      <form onSubmit={onSubmitLoginForm} className="form-container">
        <h1 className="heading">Travel Trip</h1>
        <label className="label-text" htmlFor="username">
          Username
        </label>
        <input
          onChange={onChangeUsername}
          value={username}
          className="username-input-field"
          id="username"
          type="text"
          placeholder="Username"
        />
        <label className="label-text" htmlFor="password">
          Password
        </label>
        <div className="input-container">
          <input
            onChange={onChangePassword}
            value={password}
            className="input-field"
            id="password"
            type={inputType}
            placeholder="Password"
          />
          {isShowPassword ? (
            <button
              onClick={onClickShowPassword}
              className="password-icon-btn"
              data-testid="show-password"
              type="button"
            >
              <AiOutlineEyeInvisible className="password-eye-icon" />
              <p className="password-eye">Password visible</p>
            </button>
          ) : (
            <button
              onClick={onClickShowPassword}
              className="password-icon-btn"
              data-testid="show-password"
              type="button"
            >
              <AiOutlineEye className="password-eye-icon" />
              <p className="password-eye">Password visible</p>
            </button>
          )}
        </div>
        {isSuccessError && <p className="error-msg">{errorMsg}</p>}
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
