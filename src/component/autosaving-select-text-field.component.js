import React, { Component } from 'react'
import { updateDocument } from '../firebase/firebase'
import { TextField, MenuItem } from '@material-ui/core'

class AutosavingSelectTextField extends Component {

  constructor(props) {
    super(props)
    this.dataChanged = false
  }

  handleChange = prop => event => {
    updateDocument(this.props.dataPath, {[prop]: event.target.value})  
    this.props.parent.setState({[prop]: event.target.value})
  }
  
  render = () => (
    <TextField
      select  
      fullWidth
      disabled={this.props.disabled ? true : false} 
      label={this.props.label}
      value={this.props.value ? this.props.value : ''}
      onChange={this.handleChange(this.props.prop)}
      margin="normal">
      {this.props.items.map(item => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default AutosavingSelectTextField