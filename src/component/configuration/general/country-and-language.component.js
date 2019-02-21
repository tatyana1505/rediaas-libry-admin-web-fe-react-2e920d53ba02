import React, { Component } from 'react'
import Card from '../../card.component'
import { locale } from '../../../i18n/da.locale'
import { TextField, MenuItem } from '@material-ui/core'
import { languages, countries } from '../../../config/dropdown.config'
import { Grid, Column, Row } from '../../grid/grid.component'
import { updateDocument, pathCountryAndLanguages } from '../../../firebase/firebase'
import { withFirebaseListener } from '../../hoc/firebase-listener.hoc'
import { connect } from 'react-redux'
import CircularIntegration from '../../circular-integration.component'

class CountryAndLanguage extends Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      country: '',
      defaultLanguage: '',
      alternativeLanguage: '',
      loading: false,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    country: nextProps.country,
    defaultLanguage: nextProps.defaultLanguage,
    alternativeLanguage: nextProps.alternativeLanguage,
    loading: !nextProps.country && !nextProps.defaultLanguage && !nextProps.alternativeLanguage
  })

  handleChange = prop => event => {
    updateDocument(pathCountryAndLanguages(this.props.selectedCustomer), { [prop]: event.target.value })
    this.setState({ [prop]: event.target.value });
  };

  render = () => {
    return (
      <div>
        <h1>{locale.general.country_and_language.title}</h1>
        <div>
          {this.state.loading ? (
            <div className='circular-center-wrapper'>
              <CircularIntegration />
            </div>
          ) : (
              <Card>
                <Grid>
                  <Column>
                    {this.props.user.role === 'admin' ? (
                      <Row>
                        <Column>
                          <TextField
                            fullWidth
                            select
                            label={locale.general.country_and_language.country}
                            value={this.state.country ? this.state.country : ''}
                            onChange={this.handleChange('country')}
                            margin="normal">
                            {countries.map(option => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Column>
                        <Column>
                          <div />
                        </Column>
                      </Row>
                    ) : null}
                    <Row>
                      <Column>
                        <Row>
                          <Column>
                            <TextField
                              select
                              label={locale.general.country_and_language.standard_language}
                              value={this.state.defaultLanguage ? this.state.defaultLanguage : ''}
                              onChange={this.handleChange('defaultLanguage')}
                              margin="normal">
                              {languages.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Column>
                          <Column>
                            <TextField
                              select
                              label={locale.general.country_and_language.alternative_langugage}
                              value={this.state.alternativeLanguage ? this.state.alternativeLanguage : ''}
                              onChange={this.handleChange('alternativeLanguage')}
                              margin="normal">
                              {languages.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Column>
                        </Row>
                      </Column>
                    </Row>
                  </Column>
                </Grid>
              </Card>

            )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  selectedCustomer: state.customer.selectedCustomer
})

export default connect(mapStateToProps)(withFirebaseListener(CountryAndLanguage, pathCountryAndLanguages))