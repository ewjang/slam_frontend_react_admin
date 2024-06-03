import React from 'react';
import {useParams} from "react-router-dom"; //hooks 제공

function ReadPage(props) {

    const {tno} = useParams()

    console.log('obj : ' , tno);

    return (
        <div className={'text-3xl'}> Todo Read Page</div>
    );
}

export default ReadPage;