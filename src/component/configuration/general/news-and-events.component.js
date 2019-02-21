import React, { Component } from 'react'
import Card from '../../card.component'
import { connect } from 'react-redux'
import { Grid, Column, Row } from '../../grid/grid.component'
import { locale } from '../../../i18n/da.locale'
import { pathNewsAndEvents } from '../../../firebase/firebase'
import AutosavingTextField from '../../autosaving-text-field.component'
import { withFirebaseListener } from '../../hoc/firebase-listener.hoc'

class NewsAndEvents extends Component {

  constructor(props) {
    super(props)
    this.state = {
      newsUrl: '',
      eventsUrl: '',
      loading: false,
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => ({
    newsUrl: nextProps.newsUrl,
    eventsUrl: nextProps.eventsUrl,
    loading: !nextProps.newsUrl && !nextProps.eventsUrl
  })

  render = () => (
    <div>
      <h1>{locale.general.news_and_events.title}</h1>
      <div>
        {/* {this.state.loading ? (
          <div className='circular-center-wrapper'>
            <CircularIntegration />
          </div>
        ) : ( */}
            <Card>
              <Grid>
                <Column>
                  <Row>
                    <Column>
                      <AutosavingTextField
                        parent={this}
                        value={this.state.newsUrl}
                        prop={'newsUrl'}
                        dataPath={pathNewsAndEvents(this.props.selectedCustomer)}
                        label={locale.general.news_and_events.fetch_news} />
                    </Column>
                    <Column>
                      <AutosavingTextField
                        parent={this}
                        value={this.state.eventsUrl}
                        prop={'eventsUrl'}
                        dataPath={pathNewsAndEvents(this.props.selectedCustomer)}
                        label={locale.general.news_and_events.fetch_events} />
                    </Column>
                  </Row>
                </Column>
              </Grid>
            </Card>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  selectedCustomer: state.customer.selectedCustomer
})

export default connect(mapStateToProps)(withFirebaseListener(NewsAndEvents, pathNewsAndEvents))