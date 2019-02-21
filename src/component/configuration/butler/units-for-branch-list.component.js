import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import { locale } from '../../../i18n/da.locale'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import UnitsForBranchListItem from './units-for-branch-list-item.component'
import { Button } from '@material-ui/core'
import _ from 'lodash'

class UnitsForBranchList extends Component {

  buildAccordion = () => {
    let accordion = []
    _.each(this.props.units, (unit, i) => {
      accordion.push(
        <ExpansionPanel key={i} expanded={this.props.expanded === i} onChange={this.props.handleAccordionChange(i)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <p>{unit.name}</p>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {this.props.createNewUnit === this.props.branch.branchId ? 
            <UnitsForBranchListItem 
              new
              addNewUnit={this.props.addNewUnit}
              cancelNewUnit={this.props.cancelNewUnit}
              handleBlur={() => {}} 
              handleCheckedChanged={() => {}} 
              handleChange={this.props.handleChangeInUnit} 
              unit={this.props.units['new']}
            /> : 
            <UnitsForBranchListItem 
              unit={unit}  
              handleBlur={this.props.handleOnBlurInUnit} 
              handleCheckedChanged={this.props.handleSwitchChangeInUnit} 
              handleChange={this.props.handleChangeInUnit}
              deleteUnitFromBranch={this.props.deleteUnitFromBranch}
            />}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    })
    return accordion
  }

  render = () => { 
    return (
    <div className='units-for-branch-list'>
      <div className='branch-title-wrapper'>
        <h1 key={this.props.branch.branchId}>{this.props.branch.name.dan}</h1>
      </div>
      {this.buildAccordion()}
      {_.isEmpty(this.props.units) ? <div className='no-units-for-branch-wrapper'><label>{locale.butler.units.no_units_for_branch}</label></div> : null}
      <div className='add-unit-button-wrapper' key={this.props.branch.branchId}>
        <Button color={'primary'} onClick={this.props.addNewUnitToBranch}>{locale.butler.units.add_new_unit}</Button>
      </div>
    </div>
  )}
}

export default UnitsForBranchList