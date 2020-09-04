import React from 'react'
import UserLayout from '../../Hoc/User'
import UpdatePersonalNfo from './update_personal_nfo'

const UpdateProfile = () => {
    return (
        <div>
            <UserLayout>
                <h1>Profile</h1>
                <UpdatePersonalNfo/>
            </UserLayout>
        </div>
    )
}

export default UpdateProfile
