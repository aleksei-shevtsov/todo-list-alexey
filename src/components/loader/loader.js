import React from 'react';
import Skeleton from '@mui/material/Skeleton';

const Loader = () => {
  return (
    <>
      <Skeleton variant="rectangular" width={1000} height={250} />
      <br/>
      <Skeleton variant="rectangular" width={1000} height={150} />
      <br/>
      <Skeleton variant="rectangular" width={1000} height={50} />
      <br/>
      <Skeleton variant="rectangular" width={1000} height={50} />
      <br/>
      <Skeleton variant="rectangular" width={1000} height={50} />
    </>
  )
}

export default Loader
