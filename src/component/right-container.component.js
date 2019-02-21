import React, { Component } from 'react'

class RightContainer extends Component {
  
  render = () => {
    return(
      <div className='right-container'>
        {this.props.children}
      </div>
    )
  }
}

export default RightContainer