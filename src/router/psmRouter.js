import {lazy, Suspense} from "react";
import {Navigate} from "react-router-dom";

const Loading = <div className={'bg-red-700'}>Loading....</div>
const PsmListPage = lazy(() => import("../pages/psm/ListPage"))
const todoRouter = () => {
    return [
        {
            path:'list',
            element:<Suspense fallback={Loading}><PsmListPage/></Suspense>
        },
        {
            path:'',
            element:<Navigate replace={true} to={'list'}/>
        },
       
    ]
}

export default todoRouter;