import React, { useState, useEffect } from 'react';
import UserLayout from '../../../Hoc/User';

import FormField from '../../utils/form/formField';
import { update, generateData, isFormValid, populateOptionFields, resetFields } from '../../utils/form/formAction';
import FileUpload from '../../utils/form/fileupload';

import { connect } from 'react-redux';
import { getBrands, getWoods, addProduct, clearProduct } from '../../../actions/product_action';


const AddProduct = (props) => {

    const [formError, setFormError] = useState(false)
    const [formSuccess, setFormSuccess] = useState(false)
    const [formdata, setFormdata] = useState({
        name: {
            element: 'input',
            value: '',
            config: {
                label: 'Product name',
                name: 'name_input',
                type: 'text',
                placeholder: 'Enter your name'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        description: {
            element: 'textarea',
            value: '',
            config: {
                label: 'Product description',
                name: 'description_input',
                type: 'text',
                placeholder: 'Enter your description'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        price: {
            element: 'input',
            value: '',
            config: {
                label: 'Product price',
                name: 'price_input',
                type: 'number',
                placeholder: 'Enter your price'
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        brand: {
            element: 'select',
            value: '',
            config: {
                label: 'Product Brand',
                name: 'brands_input',
                options: []
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        shipping: {
            element: 'select',
            value: '',
            config: {
                label: 'Shipping',
                name: 'shipping_input',
                options: [
                    { key: true, value: 'Yes' },
                    { key: false, value: 'No' },
                ]
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        available: {
            element: 'select',
            value: '',
            config: {
                label: 'Available, in stock',
                name: 'available_input',
                options: [
                    { key: true, value: 'Yes' },
                    { key: false, value: 'No' },
                ]
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        wood: {
            element: 'select',
            value: '',
            config: {
                label: 'Wood material',
                name: 'wood_input',
                options: []
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        frets: {
            element: 'select',
            value: '',
            config: {
                label: 'Frets',
                name: 'frets_input',
                options: [
                    { key: 20, value: 20 },
                    { key: 21, value: 21 },
                    { key: 22, value: 22 },
                    { key: 24, value: 24 }
                ]
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        publish: {
            element: 'select',
            value: '',
            config: {
                label: 'Publish',
                name: 'publish_input',
                options: [
                    { key: true, value: 'Public' },
                    { key: false, value: 'Hidden' },
                ]
            },
            validation: {
                required: true
            },
            valid: false,
            touched: false,
            validationMessage: '',
            showlabel: true
        },
        images: {
            value: [],
            validation: {
                required: false
            },
            valid: true,
            touched: false,
            validationMessage: '',
            showlabel: false
        }
    })


    const updateFields = (newFormdata) => {
        setFormdata(newFormdata)
    }

    const updateForm = (element) => {
        const newFormdata = update(element, formdata, 'products')
        setFormError(false)
        setFormdata(newFormdata)
    }

    const resetFieldHandler = () => {
        const newFormData = resetFields(formdata, 'products')

        setFormdata(newFormData)
        setFormSuccess(true)

        setTimeout(() => {
            setFormSuccess(false)
            props.dispatch(clearProduct())
        }, 3000)
    }

    const submitForm = (event) => {
        event.preventDefault();

        let dataToSubmit = generateData(formdata, 'products');
        let formIsValid = isFormValid(formdata, 'products')

        if (formIsValid) {
            props.dispatch(addProduct(dataToSubmit)).then(() => {
                if (props.products.addProduct.success) {
                    resetFieldHandler();
                } else {
                    setFormError(true)
                }
            })
        } else {
            setFormError(true)
        }
    }


    useEffect(() => {

        props.dispatch(getBrands()).then(response => {
            const newFormData = populateOptionFields(formdata, props.products.brands, 'brand');
            updateFields(newFormData)
        })

        props.dispatch(getWoods()).then(response => {
            const newFormData = populateOptionFields(formdata, props.products.woods, 'wood');
            updateFields(newFormData)
        })
    }, [])

    const imagesHandler = (images) => {
        const newFormData = { ...formdata }
        newFormData['images'].value = images;
        newFormData['images'].valid = true;

        setFormdata(newFormData)
    }

    return (
        <UserLayout>
            <div>
                <h1>Add product</h1>

                <form onSubmit={(event) => submitForm(event)}>

                    <FileUpload
                        imagesHandler={(images) => imagesHandler(images)}
                        reset={formSuccess}
                    />

                    <FormField
                        id={'name'}
                        formdata={formdata.name}
                        change={(element) => updateForm(element)}
                    />

                    <FormField
                        id={'description'}
                        formdata={formdata.description}
                        change={(element) => updateForm(element)}
                    />

                    <FormField
                        id={'price'}
                        formdata={formdata.price}
                        change={(element) => updateForm(element)}
                    />

                    <div className="form_devider"></div>

                    <FormField
                        id={'brand'}
                        formdata={formdata.brand}
                        change={(element) => updateForm(element)}
                    />

                    <FormField
                        id={'shipping'}
                        formdata={formdata.shipping}
                        change={(element) => updateForm(element)}
                    />

                    <FormField
                        id={'available'}
                        formdata={formdata.available}
                        change={(element) => updateForm(element)}
                    />

                    <div className="form_devider"></div>

                    <FormField
                        id={'wood'}
                        formdata={formdata.wood}
                        change={(element) => updateForm(element)}
                    />

                    <FormField
                        id={'frets'}
                        formdata={formdata.frets}
                        change={(element) => updateForm(element)}
                    />

                    <div className="form_devider"></div>

                    <FormField
                        id={'publish'}
                        formdata={formdata.publish}
                        change={(element) => updateForm(element)}
                    />

                    {formSuccess ?
                        <div className="form_success">
                            Success
                        </div>
                        : null}

                    {formError ?
                        <div className="error_label">
                            Please check your data
                                    </div>
                        : null}
                    <button onClick={(event) => submitForm(event)}>
                        Add product
                    </button>


                </form>

            </div>
        </UserLayout>

    )
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}


export default connect(mapStateToProps)(AddProduct);