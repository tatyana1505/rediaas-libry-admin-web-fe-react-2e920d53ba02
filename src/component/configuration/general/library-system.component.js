import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '../../card.component'
import { locale } from '../../../i18n/da.locale'
import { libraryEngine } from '../../../config/dropdown.config'
import { Grid, Column, Row } from '../../grid/grid.component'
import Button from '@material-ui/core/Button'
import Divider from '../../divider.component'
import { pathLibrarySystem } from '../../../firebase/firebase'
import AutosavingTextField from '../../autosaving-text-field.component'
import AutosavingSelectTextField from '../../autosaving-select-text-field.component'
import { withFirebaseListener } from '../../hoc/firebase-listener.hoc'

class LibrarySystem extends Component {

  constructor(props) {
    super(props)
    this.state = {
      searchEngine: '',
      username: '',
      url: '',
      password: '',
      libraryNumber: '',
      loading: false,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    searchEngine: nextProps.searchEngine,
    username: nextProps.username,
    url: nextProps.url,
    password: nextProps.password,
    libraryNumber: nextProps.libraryNumber,
    loading: !nextProps.searchEngine && !nextProps.username && !nextProps.url && !nextProps.password && !nextProps.libraryNumber
  })

  render = () => (
    <div>
      <h1>{locale.general.library_system.title}</h1>
      <div>
        {/* {this.state.loading ? (
          <div className='circular-center-wrapper'>
            <CircularIntegration />
          </div>
        ) : ( */}
            <div>
              <Card>
                <Grid>
                  <Column>
                    <Row>
                      <Column>
                        <AutosavingSelectTextField
                          parent={this}
                          value={this.state.searchEngine}
                          prop={'searchEngine'}
                          dataPath={pathLibrarySystem(this.props.selectedCustomer)}
                          label={locale.general.library_system.choose_library_system}
                          items={libraryEngine} />
                      </Column>
                      <Column>
                        <AutosavingTextField
                          parent={this}
                          value={this.state.username}
                          prop={'username'}
                          dataPath={pathLibrarySystem(this.props.selectedCustomer)}
                          label={locale.general.library_system.username} />
                      </Column>
                    </Row>
                    <Row>
                      <Column>
                        <AutosavingTextField
                          parent={this}
                          value={this.state.url}
                          prop={'url'}
                          dataPath={pathLibrarySystem(this.props.selectedCustomer)}
                          label={locale.general.library_system.url} />
                      </Column>
                      <Column>
                        <AutosavingTextField
                          parent={this}
                          value={this.state.password}
                          prop={'password'}
                          dataPath={pathLibrarySystem(this.props.selectedCustomer)}
                          label={locale.general.library_system.password} />
                      </Column>
                    </Row>
                    <Row>
                      <Column>
                        <AutosavingTextField
                          parent={this}
                          value={this.state.libraryNumber}
                          prop={'libraryNumber'}
                          dataPath={pathLibrarySystem(this.props.selectedCustomer)}
                          label={locale.general.library_system.library_number} />
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
            </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  selectedCustomer: state.customer.selectedCustomer
})

export default connect(mapStateToProps)(withFirebaseListener(LibrarySystem, pathLibrarySystem))