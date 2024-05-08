import React from 'react';
import BasicMenu from "../components/menus/BasicMenu";

function BasicLayout({children}) {
    console.log('children : ' , children);
    return (
        <div
            className="bg-white my-5 w-full flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0">
            <BasicMenu />
            {children}
        </div>
    );
}
export default BasicLayout;