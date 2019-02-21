import React, { Component } from 'react'

class Card extends Component {
  render = () => (<div className='card-wrapper'>{this.props.children}</div>)
}

export default Card