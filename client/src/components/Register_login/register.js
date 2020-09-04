import React, { useState } from 'react'
import { connect } from 'react-redux'
import Dialog from '@material-ui/core/Dialog'

import FormField from '../utils/form/formField'
import { update, generateData, isFormValid } from '../utils/form/formAction'

import { registerUser } from '../../actions/user_action'

const Register = (props) => {
    const [formError, setFormError] = useState(false)
    const [formSuccess, setFormSuccess] = useState(false)
    const [formdata, setFormdata] = useState({
        name: {
            element: 'input',
            value: '',
            config: {
                name: 'name_input',
                type: 'text',
                placeholder: 'Enter your name'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
        lastname: {
            element: 'input',
            value: '',
            config: {
                name: 'lastname_input',
                type: 'text',
                placeholder: 'Enter your lastname'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
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
        },
        confirmPassword: {
            element: 'input',
            value: '',
            config: {
                name: 'confirmPassword_input',
                type: 'password',
                placeholder: 'Confirm password'
            },
            validation: {
                required: true,
                confirm: 'password'
            },
            valid: false,
            touched: false,
            validationMessage: ''
        }
    })

    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'register')
        setFormError(false)
        setFormdata(newFormdata)
    }

    const submitForm = (event) => {
        event.preventDefault()

        let dataToSubmit = generateData(formdata, 'register')
        let formIsValid = isFormValid(formdata, 'register')

        if (formIsValid) {
            props.dispatch(registerUser(dataToSubmit)).then(response => {
                if(response.payload.success) {
                    setFormError(false)
                    setFormSuccess(true)
                    setTimeout(() => {
                        props.history.push('/register_login')
                    }, 3000)
                } else {
                    setFormError(true)
                }
            }).catch(err => {
                setFormError(true)
            })
        } else {
            setFormError(true)
        }
    }

    return (
        <div className="page_wrapepr">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <form>
                            <h2>Personal information</h2>
                            <div className="form_block_two">
                                <div className="block">
                                    <FormField
                                        id={'name'}
                                        formdata={formdata.name}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                                <div className="block">
                                    <FormField
                                        id={'lastname'}
                                        formdata={formdata.lastname}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                            </div>
                            <div>
                                <FormField
                                    id={'email'}
                                    formdata={formdata.email}
                                    change={(element) => updateForm(element)}
                                />
                            </div>
                            <div>
                                <h2>Verify password</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField
                                            id={'password'}
                                            formdata={formdata.password}
                                            change={(element) => updateForm(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormField
                                            id={'confirmPassword'}
                                            formdata={formdata.confirmPassword}
                                            change={(element) => updateForm(element)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {
                                formError ? 
                                    <div className="error_label">
                                        Please check your data
                                    </div>
                                : null
                            }

                            <button onClick={submitForm}>Register</button>
                        </form>
                    </div>
                </div>
            </div>

            <Dialog open={formSuccess}>
                <div className="dialog_alert">
                    <div>Congratulations !</div>
                    <div>
                        You will be redirected to the Login in a couple second...
                    </div>
                </div>
            </Dialog>

        </div>
    )
}

export default connect()(Register)
