import React, { Component } from 'react'
import { Grid, Column, Row } from '../../grid/grid.component'
import { locale } from '../../../i18n/da.locale'
import { TextField, Button, MenuItem } from '@material-ui/core'
import Divider from '../../../component/divider.component'
import { butlerScannerTypes, butlerBarcodeScannerTypes, butlerRfidReaderTypes, butlerPrinterTypes, departmentTypes } from '../../../config/dropdown.config'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

class UnitsForBranchListItem extends Component {
  render = () => (
    <Grid>
      <Column>
      <div className='card-content-wrapper'>
        <Row>
          <Column>
            <p className='card-header'>{locale.butler.units.unit_settings}</p>
          </Column>
        </Row>
        <Row>
          <Column>
            <TextField
              fullWidth 
              label={locale.butler.units.unit_name}
              value={this.props.unit && this.props.unit.name ? this.props.unit.name : ''}
              onChange={this.props.handleChange('name')}
              onBlur={() => this.props.handleBlur('name')}
              margin="normal" />
            <TextField
              fullWidth 
              label={locale.butler.units.log_me_in_name}
              value={this.props.unit && this.props.unit.logMeInName ? this.props.unit.logMeInName : ''}
              onChange={this.props.handleChange('logMeInName')}
              onBlur={() => this.props.handleBlur('logMeInName')}
              margin="normal" />
          </Column>
          <Column>
            <TextField
              fullWidth 
              disabled
              label={locale.butler.units.activation_code}
              value={this.props.unit && this.props.unit.activationCode ? this.props.unit.activationCode : ''}
              onChange={this.props.handleChange('activationCode')}
              onBlur={() => this.props.handleBlur('activationCode')}
              margin="normal" />
            <TextField
              select
              label={locale.butler.units.department}
              value={this.props.unit && this.props.unit.department ? this.props.unit.department : ''}
              onChange={this.props.handleChange('department')}
              onBlur={() => this.props.handleBlur('department')}
              margin="normal">
              {departmentTypes.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>))}
              </TextField>
            </Column>
          </Row>
        </div>
        <div className='card-content-wrapper'>
          <Row>
            <Column>
              <p className='card-header'>{locale.butler.units.functionality}</p>
            </Column>
          </Row>
          <Row>
            <Column>
              <FormControlLabel control={
                <Switch
                  checked={this.props.unit && this.props.unit.activateLoans ? this.props.unit.activateLoans : false}
                  value='activateLoans'
                  onChange={this.props.handleCheckedChanged('activateLoans')}
                />}
                label={locale.butler.units.activate_loans}
                />
                <FormControlLabel control={
                  <Switch
                    checked={this.props.unit && this.props.unit.activateReturns ? this.props.unit.activateReturns : false}
                    value='activateReturns'
                    onChange={this.props.handleCheckedChanged('activateReturns')}
                  />}
                label={locale.butler.units.activate_returns}
                />
                <FormControlLabel control={
                  <Switch
                    checked={this.props.unit && this.props.unit.activatePayments ? this.props.unit.activatePayments : false}
                    value='activatePayments'
                    onChange={this.props.handleCheckedChanged('activatePayments')}
                />}
                label={locale.butler.units.activate_payment}
                />
              </Column>
            <Column />
          </Row>
        </div>
        <div className='card-content-wrapper'>
          <Row>
            <Column>
              <p className='card-header'>{locale.butler.units.hardware}</p>
            </Column>
          </Row>
          <Row>
            <Column>
            <TextField
            select
            label={locale.butler.units.rfid_reader}
                value={this.props.unit && this.props.unit.rfidReader ? this.props.unit.rfidReader : ''}
                onChange={this.props.handleChange('rfidReader')}
                onBlur={() => this.props.handleBlur('rfidReader')}
            margin="normal">
            {butlerRfidReaderTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label={locale.butler.units.printer}
                value={this.props.unit && this.props.unit.printer ? this.props.unit.printer : ''}
                onChange={this.props.handleChange('printer')}
                onBlur={() => this.props.handleBlur('printer')}
            margin="normal">
            {butlerPrinterTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
            </Column>
            <Column>
            <TextField
            select
            label={locale.butler.units.scanner}
                value={this.props.unit && this.props.unit.scanner ? this.props.unit.scanner : ''}
                onChange={this.props.handleChange('scanner')}
                onBlur={() => this.props.handleBlur('scanner')}
            margin="normal">
            {butlerScannerTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label={locale.butler.units.barcode_scanner}
                value={this.props.unit && this.props.unit.barcode_scanner ? this.props.unit.barcode_scanner : ''}
                onChange={this.props.handleChange('barcode_scanner')}
                onBlur={() => this.props.handleBlur('barcode_scanner')}
            margin="normal">
            {butlerBarcodeScannerTypes.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
            </Column>
          </Row>
          <Divider />
          {this.props.new ?
            <Row>
              <Column>
                <div className='add-new-branch-button-wrapper'>
                  <Button onClick={this.props.addNewUnit} color={'primary'}>{locale.general.branch_information.create}</Button>
                  <Button onClick={this.props.cancelNewUnit} color={'secondary'}>{locale.general.branch_information.cancel}</Button>
                </div>
              </Column>
            </Row> :
            <Row>
              <Column>
              <div className='add-new-branch-button-wrapper'>
                <Button color={'secondary'} onClick={this.props.deleteUnitFromBranch}>{locale.general.branch_information.delete}</Button>
              </div>
              </Column>
            </Row>}
        </div>
      </Column>
    </Grid>
  )
}

export default UnitsForBranchListItem