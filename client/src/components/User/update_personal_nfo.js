import React, { Component } from 'react'
import { connect } from 'react-redux'
import { update, generateData, isFormValid, populateFields } from '../utils/form/formAction'
import FormField from '../utils/form/formField'
import { updateUserData, clearUpdateUser } from '../../actions/user_action'

export class UpdatePersonalNfo extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formdata: {
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
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element, formdata, 'register')
        setState({ 
            formError :false,
            formdata: newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault()

        let dataToSubmit = generateData(this.state.formdata, 'register')
        let formIsValid = isFormValid(this.state.formdata, 'register')

        if (formIsValid) {
            this.props.dispatch(updateUserData(dataToSubmit)).then(() => {
                if(this.props.user.updateUser.success) {
                    this.setState({
                        formSuccess: true
                    }, () => {
                        setTimeout(() => {
                            this.props.dispatch(clearUpdateUser())
                            this.setState({
                                formSuccess: false
                            })
                        }, 2000)
                    })
                }
            })
        } else {
            setState({
                formError: true
            })
        }
    }

    componentDidMount() {
        const newFormdata = populateFields(this.state.formdata, this.props.user.userData)
        this.setState({ formdata: newFormdata })
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.submitForm(event)}>
                    <h2>Personal information</h2>
                    <div className="form_block_two">
                        <div className="block">
                            <FormField
                                id={'name'}
                                formdata={this.state.formdata.name}
                                change={(element) => updateForm(element)}
                            />
                        </div>
                        <div className="block">
                            <FormField
                                id={'lastname'}
                                formdata={this.state.formdata.lastname}
                                change={(element) => updateForm(element)}
                            />
                        </div>
                    </div>
                    <div>
                        <FormField
                            id={'email'}
                            formdata={this.state.formdata.email}
                            change={(element) => updateForm(element)}
                        />
                    </div>
                    <div>
                        {
                            this.state.formSuccess?
                                <div className="form_success">Success</div>
                            :null
                        }
                        {
                            this.state.formError ? 
                                <div className="error_label">
                                    Please check your data
                                </div>
                            : null
                        }
                        <button onClick={this.submitForm}>Update personal form</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

export default connect(mapStateToProps)(UpdatePersonalNfo)
