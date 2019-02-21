import React, { Component } from 'react'

class LeftContainer extends Component {
  
  render = () => {
    return(
      <div className='left-container'>
        {this.props.children}
      </div>
    )
  }
}

export default LeftContainer