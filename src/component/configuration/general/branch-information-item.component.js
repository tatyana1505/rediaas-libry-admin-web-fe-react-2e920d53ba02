import React, { Component } from 'react'
import { locale } from '../../../i18n/da.locale'
import { Grid, Column, Row } from '../../grid/grid.component'
import Divider from '../../divider.component'
import { TextField, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { withFirebaseListener } from '../../hoc/firebase-listener.hoc'
import { pathBranchInformationItem } from '../../../firebase/firebase'


class BranchInfomationItem extends Component {

  render = () => {
    return (
      <Grid>
        <Column>
          <Row>
            <Column>
              <TextField
                fullWidth
                label={locale.general.branch_information.branch_name}
                value={this.props.selectedBranch && this.props.selectedBranch.name ? this.props.selectedBranch.name : ''}
                onChange={this.props.handleChange('name')}
                onBlur={() => this.props.handleBlur('name')}
                margin="normal" />
              <TextField
                fullWidth
                label={locale.general.branch_information.deparment_id}
                value={this.props.selectedBranch && this.props.selectedBranch.branchId ? this.props.selectedBranch.branchId : ''}
                onChange={this.props.handleChange('branchId')}
                onBlur={() => this.props.handleBlur('branchId')}
                margin="normal" />
            </Column>
            {this.props.user.role === 'admin' ? (
              <Column>
                <TextField
                  fullWidth
                  label={locale.general.branch_information.redia_id}
                  value={this.props.selectedBranch && this.props.selectedBranch.rediaId ? this.props.selectedBranch.rediaId : ''}
                  onChange={this.props.handleChange('rediaId')}
                  onBlur={() => this.props.handleBlur('rediaId')}
                  margin="normal" />
              </Column>
            ) : (
                <Column>
                  <div />
                </Column>
              )}
          </Row>
          <Row>
            <Column>
              <TextField
                fullWidth
                label={locale.general.branch_information.address}
                value={this.props.selectedBranch && this.props.selectedBranch.street ? this.props.selectedBranch.street : ''}
                onChange={this.props.handleChange('street')}
                onBlur={() => this.props.handleBlur('street')}
                margin="normal" />
              <TextField
                fullWidth
                label={locale.general.branch_information.zipcode}
                value={this.props.selectedBranch && this.props.selectedBranch.postcode ? this.props.selectedBranch.postcode : ''}
                onChange={this.props.handleChange('postcode')}
                onBlur={() => this.props.handleBlur('postcode')}
                margin="normal" />
              <TextField
                fullWidth
                label={locale.general.branch_information.city}
                value={this.props.selectedBranch && this.props.selectedBranch.city ? this.props.selectedBranch.city : ''}
                onChange={this.props.handleChange('city')}
                onBlur={() => this.props.handleBlur('city')}
                margin="normal" />
            </Column>
            <Column>
              <TextField
                fullWidth
                label={locale.general.branch_information.phone}
                value={this.props.selectedBranch && this.props.selectedBranch.phone ? this.props.selectedBranch.phone : ''}
                onChange={this.props.handleChange('phone')}
                onBlur={() => this.props.handleBlur('phone')}
                margin="normal" />
              <TextField
                fullWidth
                label={locale.general.branch_information.email}
                value={this.props.selectedBranch && this.props.selectedBranch.mail ? this.props.selectedBranch.mail : ''}
                onChange={this.props.handleChange('mail')}
                onBlur={() => this.props.handleBlur('mail')}
                margin="normal" />
            </Column>
          </Row>
          <Row>
            <Column>
              <TextField
                fullWidth
                label={locale.general.branch_information.longitude}
                value={this.props.selectedBranch && this.props.selectedBranch.longitude ? this.props.selectedBranch.longitude : ''}
                onChange={this.props.handleChange('longitude')}
                margin="normal" />
              <TextField
                fullWidth
                label={locale.general.branch_information.latitude}
                value={this.props.selectedBranch && this.props.selectedBranch.latitude ? this.props.selectedBranch.latitude : ''}
                onChange={this.props.handleChange('latitude')}
                margin="normal" />
            </Column>
            <Column>
              <TextField
                fullWidth
                label={locale.general.branch_information.radius}
                value={this.props.selectedBranch && this.props.selectedBranch.radius ? this.props.selectedBranch.radius : ''}
                onChange={this.props.handleChange('radius')}
                onBlur={() => this.props.handleBlur('radius')}
                margin="normal" />
            </Column>
          </Row>
          <Divider />
          {this.props.new ?
            <Row>
              <Column>
                <div className='add-new-branch-button-wrapper'>
                  <Button onClick={this.props.createBranch} color={'primary'}>{locale.general.branch_information.create}</Button>
                  <Button onClick={this.props.cancelBranch} color={'secondary'}>{locale.general.branch_information.cancel}</Button>
                </div>
              </Column>
            </Row> :
            <Row>
              <Column>
                <div className='add-new-branch-button-wrapper'>
                  <Button color={'secondary'} onClick={this.props.deleteBranch}>{locale.general.branch_information.delete}</Button>
                </div>
              </Column>
            </Row>}
        </Column>
      </Grid>
    )
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user,
  }
}

export default connect(mapStateToProps)(withFirebaseListener(BranchInfomationItem, pathBranchInformationItem)) 