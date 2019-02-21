import React, { Component } from 'react'
import Card from '../../card.component'
import { locale } from '../../../i18n/da.locale'
import { TextField, MenuItem } from '@material-ui/core'
import AutosavingTextField from '../../autosaving-text-field.component'
import { numberOfCharacters, keyboardTypes } from '../../../config/dropdown.config'
import { Grid, Column, Row } from '../../grid/grid.component'
import { updateDocument, pathLibraryAndIdentity } from '../../../firebase/firebase'
import { connect } from 'react-redux'
import { withFirebaseListener } from '../../hoc/firebase-listener.hoc'
import CircularIntegration from '../../circular-integration.component'


class LibraryAndIdentity extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      identityColor: '',
      numberOfCharactersInPasswords: '',
      keyboardType: '',
      loading: false,
    }
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    name: nextProps.name,
    identityColor: nextProps.identityColor,
    numberOfCharactersInPasswords: nextProps.numberOfCharactersInPasswords,
    keyboardType: nextProps.keyboardType,
    loading: !nextProps.name && !nextProps.identityColor && !nextProps.numberOfCharactersInPasswords && !nextProps.keyboardType
  })

  handleSelectChange = prop => event => {
    updateDocument(pathLibraryAndIdentity(this.props.selectedCustomer), { [prop]: event.target.value })
    this.setState({ [prop]: event.target.value });
  }

  render = () => {

    let backgroundColor = {
      backgroundColor: this.props.identityColor
    }
    return (
      <div>
        <h1>{locale.general.library_and_identity.title}</h1>
        <div>
          {this.state.loading ? (
            <div className='circular-center-wrapper'>
              <CircularIntegration />
            </div>
          ) : (
              <div>
                <Card>
                  <Grid>
                    <Column>
                      <AutosavingTextField
                        parent={this}
                        value={this.state.name}
                        prop={'name'}
                        dataPath={pathLibraryAndIdentity(this.props.selectedCustomer)}
                        label={locale.general.library_and_identity.library_name} />
                    </Column>
                    <Column>
                      <Row>
                        <div className={`color-box`} style={backgroundColor} />
                        <AutosavingTextField
                          parent={this}
                          value={this.state.identityColor}
                          prop={'identityColor'}
                          dataPath={pathLibraryAndIdentity(this.props.selectedCustomer)}
                          label={locale.general.library_and_identity.library_color} />
                      </Row>
                    </Column>
                  </Grid>
                </Card>
                <Card>
                  <Grid>
                    <Column>
                      <TextField
                        select
                        label={locale.general.library_and_identity.number_of_characters_in_users_password}
                        value={this.state.numberOfCharactersInPasswords ? this.state.numberOfCharactersInPasswords : ''}
                        onChange={this.handleSelectChange('numberOfCharactersInPasswords')}
                        margin="normal">
                        {numberOfCharacters.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Column>
                    <Column>
                      <TextField
                        select
                        label={locale.general.library_and_identity.keyboard_type}
                        value={this.state.keyboardType ? this.state.keyboardType : ''}
                        onChange={this.handleSelectChange('keyboardType')}
                        margin="normal">
                        {keyboardTypes.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Column>
                  </Grid>
                </Card>
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

export default connect(mapStateToProps)(withFirebaseListener(LibraryAndIdentity, pathLibraryAndIdentity))