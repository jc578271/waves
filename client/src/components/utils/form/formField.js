import React from 'react'

const FormField = ({ formdata, change, id }) => {
    const showError = () => {
        let errorMessage = null

        if(!formdata.valid && formdata.validation) {
            errorMessage = (
                <div className="error_label">
                    {formdata.validationMessage}
                </div>
            )
        }

        return errorMessage
    }

    const renderTemplate = () => {
        let template = null
        
        switch(formdata.element){
            case 'input':
                template = (
                    <div className="formBlock">
                        { formdata.showlabel ? 
                            <div className="label_inputs">{formdata.config.label}</div>
                        :null}

                        <input
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event) => change({ event, id, blur: true })}
                            onChange={event => change({ event, id })}
                        />
                        {showError()}
                    </div>
                )
            break
            case('select'):
                template = (
                    <div className="formBlock">
                        { formdata.showlabel ? 
                            <div className="label_inputs">{formdata.config.label}</div>
                        :null}
                        <select
                            value={formdata.value}
                            onBlur={(event)=> change({event,id,blur:true})}
                            onChange={(event)=> change({event,id}) }
                        >
                            <option value="">Select one</option>
                            {
                                formdata.config.options.map(item=>(
                                    <option 
                                        key={item.key} 
                                        value={item.key}
                                    >
                                        {item.value}
                                    </option>
                                ))
                            }
                        </select>
                        {showError()}
                    </div>
                )
            break
            case('textarea'):
                template = (
                    <div className="formBlock">
                        { formdata.showlabel ? 
                            <div className="label_inputs">{formdata.config.label}</div>
                        :null}
                        <textarea
                            {...formdata.config}
                            value={formdata.value}
                            onBlur={(event)=> change({event,id,blur:true})}
                            onChange={(event)=> change({event,id}) }
                        />
                        {showError()}
                    </div>
            )
            break
            default: 
                template = null
        }

        return template
    }

    return (
        <div>
            {renderTemplate()}
        </div>
    )
}

export default FormField
