import React, { Component } from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { updateDocument } from '../firebase/firebase'

import Checkbox from '@material-ui/core/Checkbox'

class AutosavingCheckBox extends Component {

  handleChange = prop => event => {
    updateDocument(this.props.dataPath, {[prop]: event.target.checked})
    this.props.parent.setState({[prop]: event.target.checked });
  };

  render = () => (
    <FormControlLabel control={
      <Checkbox
        checked={this.props.checked ?  this.props.checked : false}
        onChange={this.handleChange(this.props.prop)}
        value={this.props.prop}
      />} 
      label={this.props.label}
    />
  )
}

export default AutosavingCheckBox