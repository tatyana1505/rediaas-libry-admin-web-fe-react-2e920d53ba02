import React, { Component } from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BranchInformationItem from './branch-information-item.component'
import Card from '../../card.component'
import { locale } from '../../../i18n/da.locale'
import Button from '@material-ui/core/Button'
import { readCollection, updateDocument, setDocument, pathBranches, deleteDocument } from '../../../firebase/firebase'
import { connect } from 'react-redux'
import _ from 'lodash'
import CircularIntegration from '../../circular-integration.component'

class BranchInformation extends Component {

  constructor(props) {
    super(props)
    this.state = {
      branches: [],
      selectedBranch: '',
      showNewBranch: false,
      expanded: false,
    }
    this.stateChanged = false
    this.handleChange = this.handleChange.bind(this)
    this.createBranch = this.createBranch.bind(this)
    this.cancelBranch = this.cancelBranch.bind(this)
  }

  buildSelect = branches => {
    let result = []
    branches.forEach(branch => {
      result.push({
        branch: branch,
        value: branch.branchId,
        label: `${branch.name} (${branch.branchId})`
      })
    })
    return result
  }

  componentDidMount = () => {
    this.unsubscribe = readCollection(pathBranches(this.props.selectedCustomer), snapshot => {
      let branches = []
      let branchesMap = {}
      snapshot.forEach(doc => {
        if (doc.exists) {
          let data = doc.data()
          branches.push(data)
          branchesMap[data.branchId] = data
        }
      })
      this.setState({ branches: this.buildSelect(branches), branchesMap: branchesMap })
    })
  }

  componentWillUnmount = () => {
    this.unsubscribe()
  }

  handleChange = prop => event => {
    let data = { [prop]: event.target.value }
    if (prop === 'selectedBranch') {
      data.showNewBranch = false
    }
    this.setState(data);
  };

  handleChangeInBranch = prop => event => {
    let branch = Object.assign({}, this.state.branchesMap[this.state.expanded])
    let branchesMap = Object.assign({}, this.state.branchesMap)
    branch[prop] = event.target.value
    branchesMap[this.state.expanded] = branch
    this.setState({ branchesMap: branchesMap });
  };

  handleAccordionChange = panel => (event, expanded) => {
    this.setState(
      { expanded: expanded ? panel : false }
    )
  }

  handleOnBlurInBranch = prop => {
    let branch = this.state.branchesMap[this.state.expanded]
    if (branch[prop] !== undefined) {
      updateDocument(`${pathBranches(this.props.selectedCustomer)}/${this.state.expanded}`, { [prop]: branch[prop] })
    }
  }

  createBranch = () => {
    console.log(`${pathBranches(this.props.selectedCustomer)}/${this.state.branchesMap[this.state.expanded].branchId}`)
    this.setState({ showNewBranch: false, expanded: this.state.branchesMap[this.state.expanded].branchId })
    setDocument(`${pathBranches(this.props.selectedCustomer)}/${this.state.branchesMap[this.state.expanded].branchId}`, this.state.branchesMap[this.state.expanded])
  }

  deleteBranch = () => {
    deleteDocument(`${pathBranches(this.props.selectedCustomer)}/${this.state.branchesMap[this.state.expanded].branchId}`, () => {
      this.setState({ selectedBranch: '' })
    })
  }

  cancelBranch = () => {
    this.setState({ selectedBranch: '', showNewBranch: false })
  }

  buildAccordion = () => {
    let accordion = []
    _.each(this.state.branches, branch => {
      accordion.push(
        <ExpansionPanel key={branch.branch.branchId} expanded={this.state.expanded === branch.branch.branchId} onChange={this.handleAccordionChange(branch.branch.branchId)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <p>{branch.label}</p>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {this.state.showNewBranch ? <BranchInformationItem new cancelNewUnitToBranch={this.cancelNewUnitToBranch} createBranch={this.createBranch} selectedBranch={this.state.branchesMap[this.state.expanded] ? this.state.branchesMap[this.state.expanded] : ''} handleChange={this.handleChangeInBranch} handleBlur={() => { }} /> : <BranchInformationItem deleteBranch={this.deleteBranch} selectedBranch={this.state.branchesMap[this.state.expanded]} handleBlur={this.handleOnBlurInBranch} handleChange={this.handleChangeInBranch} />}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    })
    return accordion
  }

  render = () => {
    return (
      <div>
        <h1>{locale.general.branch_information.title}</h1>
        <div>
          {this.state.branchesMap ? (
            <div>
              {this.buildAccordion()}
              {this.state.showNewBranch ? <div className='add-branch-no-button-wrapper' /> :
                <div className='add-branch-button-wrapper'>
                  <Button color={'primary'} onClick={() => this.setState({ showNewBranch: true, expanded: '' })}>{locale.general.branch_information.add_new_branch}</Button>
                </div>}
              {this.state.showNewBranch ?
                <Card>
                  <BranchInformationItem
                    new
                    cancelBranch={this.cancelBranch}
                    createBranch={this.createBranch}
                    selectedBranch={this.state.branchesMap[this.state.selectedBranch] ? this.state.branchesMap[this.state.selectedBranch] : ''} handleChange={this.handleChangeInBranch} handleBlur={() => { }} /></Card> : null}
            </div>
          ) : (
              <div className='circular-center-wrapper'>
                <CircularIntegration />
              </div>
            )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  selectedCustomer: state.customer.selectedCustomer
})

export default connect(mapStateToProps)(BranchInformation)