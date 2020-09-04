import React, { useEffect, useState } from 'react';

import FormField from '../../utils/form/formField';
import { update, generateData, isFormValid, resetFields } from '../../utils/form/formAction';

import { connect } from 'react-redux';
import { getBrands, addBrand } from '../../../actions/product_action';

const ManageBrands = (props) => {

    const [formError, setFormError] = useState(false)
    const [formSuccess, setFormSuccess] = useState(false)
    const [formdata, setFormdata] = useState({
        name: {
            element: 'input',
            value: '',
            config: {
                name: 'name_input',
                type: 'text',
                placeholder: 'Enter the brand'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: ''
        },
    })

    const showCategoryItems = () => (
        props.products.brands ?
            props.products.brands.map((item, i) => (
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>
            ))
            : null
    )

    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'brands')
        setFormError(false)
        setFormdata(newFormdata)
    }

    const resetFieldsHandler = () => {
        const newFormData = resetFields(formdata, 'brands');

        setFormdata(newFormData)
        setFormSuccess(true)
    }


    const submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(formdata, 'brands');
        let formIsValid = isFormValid(formdata, 'brands')
        let existingBrands = props.products.brands;

        if (formIsValid) {
            props.dispatch(addBrand(dataToSubmit, existingBrands)).then(response => {
                if (response.payload.success) {
                    resetFieldsHandler();
                } else {
                    setFormError(true)
                }
            })
        } else {
            setFormError(true)
        }
    }

    useEffect(() => {
        props.dispatch(getBrands());
    }, [])


    return (
        <div className="admin_category_wrapper">
            <h1>Brands</h1>
            <div className="admin_two_column">
                <div className="left">
                    <div className="brands_container">
                        {showCategoryItems()}
                    </div>
                </div>
                <div className="right">

                    <form onSubmit={(event) => submitForm(event)}>

                        <FormField
                            id={'name'}
                            formdata={formdata.name}
                            change={(element) => updateForm(element)}
                        />


                        {formError ?
                            <div className="error_label">
                                Please check your data
                        </div>
                            : null}
                        <button onClick={(event) => submitForm(event)}>
                            Add brand
                    </button>

                    </form>

                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(ManageBrands);