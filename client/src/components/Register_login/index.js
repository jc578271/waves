import React from 'react'
import MyButton from '../utils/button'
import Login from './login'

const RegisterLogin = (props) => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New customers</h1>
                        <p>Hoho hohoh hohoho hoho ohoho hoh ohohohoh ohoho 
                        oho hoh ohohohohh ohohohohh o hohohohoh hhohohoo 
                        hohoh hohoho ho h oh o hohohohoh hohoho ohohoh ohohoh</p>
                        <MyButton
                            type="default"
                            title="Createan acount"
                            linkTo="/register"
                            addStyle={{
                                margin: '10px 0 0 0'
                            }}
                        />
                    </div>

                    <div className="right">
                        <h2>Registered customers</h2>
                        <p>If you have an account plz log in.</p>
                        <Login/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterLogin
