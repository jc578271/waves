import React, { Component } from 'react'
import { connect } from 'react-redux'
import { update, generateData, isFormValid, populateFields } from '../../utils/form/formAction'
import FormField from '../../utils/form/formField'
import { getSiteData, updateSiteData } from '../../../actions/site_action'

export class UpdateSiteNfo extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            address: {
                element: 'input',
                value: '',
                config: {
                    label: 'Address',
                    name: 'address_input',
                    type: 'text',
                    placeholder: 'Enter the site address'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            hours: {
                element: 'input',
                value: '',
                config: {
                    label: 'Working hours',
                    name: 'hours_input',
                    type: 'text',
                    placeholder: 'Enter the working hours'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            phone: {
                element: 'input',
                value: '',
                config: {
                    label: 'Phone number',
                    name: 'phone_input',
                    type: 'text',
                    placeholder: 'Enter the phone number'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            },
            email: {
                element: 'input',
                value: '',
                config: {
                    label: 'Shop email',
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter the shop email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
                showLabel: true
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = update(element, formdata, 'site_info')
        setState({ 
            formError: false,
            formdata: newFormdata
        })
    }

    submitForm = (event) => {
        event.preventDefault()

        let dataToSubmit = generateData(this.state.formdata, 'site_info')
        let formIsValid = isFormValid(this.state.formdata, 'site_info')

        if (formIsValid) {
            this.props.dispatch(updateSiteData(dataToSubmit)).then(() => {
                this.setState({
                    formSuccess: true
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            formSuccess: false
                        })
                    }, 2000)
                })
            })
        } else {
            setState({
                formError: true
            })
        }
    }

    componentDidMount() {
        this.props.dispatch(getSiteData()).then(() => {
            console.log(this.props.site.siteData[0])
            const newFormdata = populateFields(this.state.formdata, this.props.site.siteData[0])
            this.setState({ formdata: newFormdata })
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.submitForm(event)}>
                        <FormField
                            id={'address'}
                            formdata={this.state.formdata.address}
                            change={(element) => updateForm(element)}
                        />
                        <FormField
                            id={'hours'}
                            formdata={this.state.formdata.hours}
                            change={(element) => updateForm(element)}
                        />
                        <FormField
                            id={'phone'}
                            formdata={this.state.formdata.phone}
                            change={(element) => updateForm(element)}
                        />
                        <FormField
                            id={'email'}
                            formdata={this.state.formdata.email}
                            change={(element) => updateForm(element)}
                        />
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
    user: state.user,
    site: state.site
})

export default connect(mapStateToProps)(UpdateSiteNfo)
