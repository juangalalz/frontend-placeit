import React, { Component } from 'react';

import './loading.scss';

class Loading extends Component {

  render() {
    return (
      <div className="loading">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Loading;
