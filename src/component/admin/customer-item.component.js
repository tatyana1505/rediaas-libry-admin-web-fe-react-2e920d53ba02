import React, { Component } from 'react'
import { Grid, Column, Row } from '../grid/grid.component'
import Divider from '../divider.component'
import { locale } from '../../i18n/da.locale'
import { TextField, MenuItem, Switch, FormControlLabel, Button } from '@material-ui/core'
import { countries } from '../../config/dropdown.config'

class CustomerItem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      l: false
    }
  }

  render = () => {
    return(
      <div>
        <Grid>
          <Column>
            <Divider />
            <Row>
              <Column>
              <TextField 
                fullWidth 
                label={locale.admin.name}
                value={this.props.customer && this.props.customer.name ? this.props.customer.name : ''}
                onChange={this.props.handleChange('name')}
                onBlur={() => this.props.handleOnBlur('name')}
                margin="normal" />
              </Column>
              <Column>
              <TextField 
                fullWidth 
                label={locale.admin.customerId}
                value={this.props.customer && this.props.customer.customerId ? this.props.customer.customerId : ''}
                onChange={this.props.handleChange('customerId')}
                onBlur={() => this.props.handleOnBlur('customerId')}
                margin="normal" />
                {!this.props.new ? <TextField
                  fullWidth 
                  select
                  label={locale.admin.country}
                  value={this.props.country ? this.props.country : ''}
                  onChange={this.props.handleChange('country')}
                  margin="normal">
                  {countries.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField> : null}
              </Column>
            </Row>
            <Row>
              <Column>
                <div className='customer-item-switch-wrapper'>
                  <FormControlLabel control={<Switch value='libryApp' onChange={this.props.handleChange('libryApp')} checked={this.props.enabledProducts && this.props.enabledProducts.libryApp ? this.props.enabledProducts.libryApp : false} />} label={locale.admin.libry_app}/>
                  <FormControlLabel control={<Switch value='butler' onChange={this.props.handleChange('butler')} checked={this.props.enabledProducts && this.props.enabledProducts.butler ? this.props.enabledProducts.butler : false} />} label={locale.admin.butler}/>
                </div>
              </Column>
            </Row>
            <Divider />
          {this.props.new ?
            <Row>
              <Column>
                <div className='add-new-branch-button-wrapper'>
                  <Button onClick={this.props.createCustomer} color={'primary'}>{locale.general.branch_information.create}</Button>
                  <Button onClick={this.props.cancelCreateCustomer}color={'secondary'}>{locale.general.branch_information.cancel}</Button>
                </div>
              </Column>
            </Row> :
            <Row>
              <Column>
              <div className='add-new-branch-button-wrapper'>
                <Button color={'secondary'} onClick={this.props.deleteCustomer}>{locale.general.branch_information.delete}</Button>
              </div>
              </Column>
            </Row>}
          </Column>        
        </Grid>
      </div>
    )
  }
}

export default CustomerItem;