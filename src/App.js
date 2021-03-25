import React, { useState } from 'react';
import { connect } from 'react-redux';
import { testAction } from './actions/actions'
import Dashboard from './components/Dashboard/Dashboard';

const App = (props) => {
  const [init, setInit] = useState(false)

  console.log('init: ', init)
  console.log('some state: ', props.someState)

  return (
    <div className="App">
      <header className="App-header">
        <Dashboard />
      </header>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    someState: state.dashboard.someState
  }
}

const actions = {
  testAction
}

export default connect(mapStateToProps, actions)(App);
