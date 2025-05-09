import React from 'react'
import { useParams } from 'react-router-dom'
import ReadComponent from '../../components/products/ReadCompoenet';

function ReadPage(props) {

  const {pno} = useParams();



  return (
    <div className="p-4 w-full bg-white">
    <div className="text-3xl font-extrabold">
      Products Read Page  
    </div>

      <ReadComponent pno={pno}></ReadComponent>

    </div>

    
  )
}

export default ReadPage