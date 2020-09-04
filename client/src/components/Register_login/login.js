import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import FormField from '../utils/form/formField'
import { update, generateData, isFormValid } from '../utils/form/formAction'

import { loginUser } from '../../actions/user_action'

const Login = (props) => {
    const [formError, setFormError] = useState(false)
    const [formSuccess, setFormSuccess] = useState('')
    const [formdata, setFormdata] = useState({
        email: {
            element: 'input',
            value: '',
            config: {
                name: 'email_input',
                type: 'email',
                placeholder: 'Enter your email'
            },
            validation: {
                required: true,
                email: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        password: {
            element: 'input',
            value: '',
            config: {
                name: 'password_input',
                type: 'password',
                placeholder: 'Enter your password'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    })

    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'login')
        setFormError(false)
        setFormdata(newFormdata)
    }

    const submitForm = (event) => {
        event.preventDefault()

        let dataToSubmit = generateData(formdata, 'login')
        let formIsValid = isFormValid(formdata, 'login')

        if (formIsValid) {
            props.dispatch(loginUser(dataToSubmit)).then(response => {
                if(response.payload.loginSuccess) {
                    console.log(response.payload)
                    props.history.push('/user/dashboard')
                } else {
                    setFormError(true)
                }
            })
        } else {
            setFormError(true)
        }
    }

    return (
        <div className="signin_wrapper">
            <form onSubmit={submitForm}>

                <FormField
                    id={'email'}
                    formdata={formdata.email}
                    change={(element) => updateForm(element)}
                />

                <FormField
                    id={'password'}
                    formdata={formdata.password}
                    change={(element) => updateForm(element)}
                />

                {
                    formError ? 
                        <div className="error_label">
                            Please check your data
                        </div>
                    : null
                }

                <button onClick={submitForm}>Login</button>

            </form>
            
        </div>
    )
}

export default connect()(withRouter(Login))
