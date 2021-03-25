import React, { useEffect } from 'react';
import { testAction } from '../../actions/actions';

const Dashboard = () => {

  return (
    <div>
      {testAction()}
      <div>Data:</div>
      <div></div>
    </div>
  )
}

export default Dashboard