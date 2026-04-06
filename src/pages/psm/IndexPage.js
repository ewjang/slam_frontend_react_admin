import React from 'react';
import BasicLayout from '../../layouts/BasicLayout';
import { Outlet, useNavigate } from 'react-router-dom';

function IndexPage(props) {

    const navigate = useNavigate()


    return (
        <BasicLayout>
            <div className="text-black font-extrabold -mt-10">
                Psm example Menu
            </div>

            <div className="flex flex-wrap w-full">
                <Outlet/>
            </div>
        </BasicLayout>
    ); 
}

export default IndexPage;