import React, { Component } from 'react'
import { connect } from 'react-redux'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import { updateDocument } from '../firebase/firebase'


class AutosavingSwitch extends Component {
  
  handleChange = prop => event => {
    updateDocument(this.props.dataPath, {[prop]: event.target.checked})
    this.props.parent.setState({[prop]: event.target.checked });
  };
  
  render = () => (
    <FormControlLabel control={
      <Switch
        checked={this.props.checked ? this.props.checked : false}
        value={this.props.prop}
        onChange={this.handleChange(this.props.prop)}
      />}
      label={this.props.label}
    />
  )
}

const mapStateToProps = state => ({
  selectedCustomer: state.customer.selectedCustomer
})  

export default connect(mapStateToProps)(AutosavingSwitch)