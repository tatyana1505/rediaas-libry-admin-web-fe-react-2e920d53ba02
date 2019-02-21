import React, { Component } from 'react'
import { connect } from 'react-redux'
import { locale } from '../../../i18n/da.locale'
import { readCollection, updateDocument, deleteDocument, pathBranches, pathButlerUnits, addDocument } from '../../../firebase/firebase'
import UnitsForBranchList from './units-for-branch-list.component'
import _ from 'lodash'
import CircularIntegration from '../../circular-integration.component'

class Units extends Component {

  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      branches: undefined,
      units: [],
      showCreateNewUnit: false
    }
    this.handleChangeInUnit = this.handleChangeInUnit.bind(this)
    this.handleOnBlurInUnit = this.handleOnBlurInUnit.bind(this)
    this.handleSwitchChangeInUnit = this.handleSwitchChangeInUnit.bind(this)
  }

  componentDidMount = () => {
    this.unsubscribeBranchesCollection = readCollection(pathBranches(this.props.selectedCustomer), snapshot => {
      if (!snapshot.empty) {
        let branches = []
        snapshot.forEach(branch => {
          if (branch.exists) {
            branches.push(branch.data())
          }
        });
        this.setState({
          branches: branches
        })
      }
    })
    this.unsubscribeUnitsCollection = readCollection(pathButlerUnits(this.props.selectedCustomer), snapshot => {
      if (!snapshot.empty) {
        let units = {}
        snapshot.forEach(unit => {
          if (unit.exists) {
            units[unit.id] = unit.data()
          }
        });
        this.setState({ units: units })
      }
    })
  }

  handleChangeInUnit = prop => event => {
    let unit = Object.assign({}, this.state.units[this.state.expanded])
    let units = Object.assign({}, this.state.units)
    unit[prop] = event.target.value
    units[this.state.expanded] = unit
    this.setState({ units: units });
  }

  handleSwitchChangeInUnit = prop => event => {
    let unit = Object.assign({}, this.state.units[this.state.expanded])
    unit[prop] = event.target.checked
    updateDocument(`${pathButlerUnits(this.props.selectedCustomer)}/${this.state.expanded}`, { [prop]: unit[prop] })
  }

  handleOnBlurInUnit = prop => {
    let unit = this.state.units[this.state.expanded]
    if (unit[prop] !== undefined) {
      updateDocument(`${pathButlerUnits(this.props.selectedCustomer)}/${this.state.expanded}`, { [prop]: unit[prop] })
    }
  }

  handleAccordionChange = panel => (event, expanded) => {
    this.setState({ expanded: expanded ? panel : false })
  }

  buildUnitsMap = (branchId, units) => {
    let unitsForBranch = {}
    for (var unit in units) {
      if (units[unit].branchId === branchId) {
        unitsForBranch[unit] = units[unit]
      }
    }
    return unitsForBranch
  }

  addNewUnitToBranch = branch => {
    let unit = {
      branchId: branch,
      unitId: 'new'
    }
    let units = Object.assign({}, this.state.units)
    units['new'] = unit
    this.setState({ showCreateNewUnit: branch, units: units, expanded: 'new' })
  }

  cancelNewUnitToBranch = () => {
    let units = Object.assign({}, this.state.units)
    delete units['new']
    this.setState({ showCreateNewUnit: '', expanded: '', units: units })
  }

  deleteUnitFromBranch = customer => {
    deleteDocument(`${pathButlerUnits(customer)}/${this.state.expanded}`, () => {
      this.setState({ expanded: '' })
    })
  }

  createUnitForBranch = customer => {
    addDocument(`${pathButlerUnits(customer)}`,
      this.state.units[this.state.expanded],
      ref => {
        this.setState({ showCreateNewUnit: false, expanded: ref })
      })
  }

  buildUnitsListForBranches = (branches, units) => {
    let branchesList = []
    _.each(branches, branch => {
      branchesList.push(
        <UnitsForBranchList
          createNewUnit={this.state.showCreateNewUnit}
          addNewUnit={() => this.createUnitForBranch(this.props.selectedCustomer)}
          addNewUnitToBranch={() => this.addNewUnitToBranch(branch.branchId)}
          deleteUnitFromBranch={() => this.deleteUnitFromBranch(this.props.selectedCustomer)}
          cancelNewUnit={() => this.cancelNewUnitToBranch()}
          expanded={this.state.expanded}
          handleAccordionChange={this.handleAccordionChange}
          handleOnBlurInUnit={this.handleOnBlurInUnit}
          handleSwitchChangeInUnit={this.handleSwitchChangeInUnit}
          handleChangeInUnit={this.handleChangeInUnit}
          key={branch.branchId}
          branch={branch}
          units={this.buildUnitsMap(branch.branchId, units)} />)
    })
    return branchesList
  }
  componentWillUnmount = () => {
    this.unsubscribeBranchesCollection()
    this.unsubscribeUnitsCollection()
  }

  render = () => {
    var component = undefined
    if (!this.state.branches) {
      component =
        <div className='circular-center-wrapper'>
          <CircularIntegration />
        </div>
    } else {
      component =
        <div>
          {this.buildUnitsListForBranches(this.state.branches, this.state.units)}
        </div>
    }
    return (
      <div>
        <h1>{locale.butler.units.title}</h1>
        <div>
          {component}
        </div>
      </div>
    )
  }
}
const mapStateToPros = state => ({
  selectedCustomer: state.customer.selectedCustomer
})

export default connect(mapStateToPros)(Units)