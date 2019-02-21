import React, { Component } from 'react'
import { TextField } from '@material-ui/core'
import { updateDocument } from '../firebase/firebase'

class AutosavingTextField extends Component {

  constructor(props) {
    super(props)
    this.dataChanged = false
  }

  handleChange = prop => event => {
    if(this.props.parent.state[prop] !== event.target.value) {
      this.dataChanged = true
    }
    this.props.parent.setState({[prop]: event.target.value });
  }

  handleOnBlur = prop => event => {
    if(this.dataChanged) {
      updateDocument(this.props.dataPath, {[prop]: event.target.value})
      this.dataChanged = false
    }
  }

  render = () => (
    <TextField
      fullWidth
      disabled={this.props.disabled ? true : false}
      label={this.props.label}
      value={this.props.value ? this.props.value : ''}
      onChange={this.handleChange(this.props.prop)}
      onBlur={this.handleOnBlur(this.props.prop)}
      margin="normal" />
    )
}

export default AutosavingTextField