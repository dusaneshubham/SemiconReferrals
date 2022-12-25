import React from 'react'
import { noDataFoundIllustration } from "../../../images/images";

const NoDataFoundCard = () => {
  return (
    <div>
      <img src={noDataFoundIllustration} alt="no data found" className='img-fluid w-100' height="600" width="600" />
    </div>
  )
}

export default NoDataFoundCard