import React from 'react';
import UserLayout from '../../../Hoc/User';
import ManageBrands from './manage_brands';
import ManageWoods from './manage_woods';

const ManageCategories = (props) => {
    return (
        <UserLayout>
            <ManageBrands/>
            <ManageWoods/>
        </UserLayout>
    );
};

export default ManageCategories;