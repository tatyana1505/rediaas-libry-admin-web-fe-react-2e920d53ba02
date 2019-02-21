import React, { Component } from 'react'

export class Grid extends Component {
  render = () => (<div className='grid'>{this.props.children}</div>)
}

export class Column extends Component {
  render = () => (<div className='column'>{this.props.children}</div>)
}

export class Row extends Component {
  render = () => (<div className='row'>{this.props.children}</div>)
}