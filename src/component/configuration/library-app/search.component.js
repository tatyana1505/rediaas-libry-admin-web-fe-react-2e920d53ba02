import React, { Component } from 'react'
import Card from '../../card.component'
import Divider from '../../divider.component'
import { Column, Grid, Row } from '../../grid/grid.component'
import AutosavingTextField from '../../autosaving-text-field.component'
import AutosavingSelectTextField from '../../autosaving-select-text-field.component'
import { locale } from '../../../i18n/da.locale'
import { pathLibraryAppSearch } from '../../../firebase/firebase'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import { searchEngine, numberOfTypes, versions } from '../../../config/dropdown.config'
import { withFirebaseListener } from '../../hoc/firebase-listener.hoc'
import CircularIntegration from '../../circular-integration.component'

class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      engine: '',
      version: '',
      agencyNumber: '',
      numberOfTypes: '',
      profile: '',
      loading: false,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    engine: nextProps.engine,
    version: nextProps.version,
    agencyNumber: nextProps.agencyNumber,
    numberOfTypes: nextProps.numberOfTypes,
    profile: nextProps.profile,
    loading: !nextProps.engine && !nextProps.version && !nextProps.agency_number && !nextProps.numberOfTypes && !nextProps.profile
  })

  render = () => (
    <div>
      <h1>{locale.library_app.search.title}</h1>
      <div>
        {this.state.loading ? (
          <div className='circular-center-wrapper'>
            <CircularIntegration />
          </div>
        ) : (
            <Card>
              <Grid>
                <Column>
                  <Row>
                    <Column>
                      <AutosavingSelectTextField
                        parent={this}
                        value={this.state.engine}
                        prop={'engine'}
                        dataPath={pathLibraryAppSearch(this.props.selectedCustomer)}
                        label={locale.general.search.search_engine}
                        items={searchEngine} />
                    </Column>
                    <Column>
                      <AutosavingSelectTextField
                        parent={this}
                        value={this.state.version}
                        prop={'version'}
                        dataPath={pathLibraryAppSearch(this.props.selectedCustomer)}
                        label={locale.general.search.version}
                        items={versions} />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <AutosavingTextField
                        parent={this}
                        value={this.state.agencyNumber}
                        prop={'agencyNumber'}
                        dataPath={pathLibraryAppSearch(this.props.selectedCustomer)}
                        label={locale.general.search.agency_number} />
                    </Column>
                    <Column>
                      <AutosavingTextField
                        parent={this}
                        value={this.state.profile}
                        prop={'profile'}
                        dataPath={pathLibraryAppSearch(this.props.selectedCustomer)}
                        label={locale.general.search.profile} />
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <AutosavingSelectTextField
                        parent={this}
                        value={this.state.numberOfTypes}
                        prop={'numberOfTypes'}
                        dataPath={pathLibraryAppSearch(this.props.selectedCustomer)}
                        label={locale.general.search.number_of_types}
                        items={numberOfTypes} />
                    </Column>
                    <Column />
                  </Row>
                  {this.props.user.role === 'admin' ? (
                    <div>
                  <Divider />
                  <Row>
                    <Column>
                      <Button color={'primary'}>{locale.general.search.test_connection}</Button>
                    </Column>
                  </Row>
                  </div>
                  ) : null}
                </Column>
              </Grid>
            </Card>
          )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  selectedCustomer: state.customer.selectedCustomer
})

export default connect(mapStateToProps)(withFirebaseListener(Search, pathLibraryAppSearch))