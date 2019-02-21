import React, { Component } from 'react'
import LeftContainer from './left-container.component'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab';
import { locale } from '../i18n/da.locale'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { mainMenuChange } from '../redux/menu/actions'
import { menuItems } from '../config/menu.config'

// We can use inline-style
const style = {
  color: 'white',
  height: 48,
};


class TopContainer extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      value: 0
    }
  }

  handleChange = (e, v) => {
    this.props.mainMenuChange(menuItems[v])
    this.props.history.push(menuItems[v])
    this.setState({value: v})
  }

  render = () => {
    console.log(locale)
    return (
      <div className='top-container'>
        <LeftContainer />
          <div className='top-title-container'>
            <h1>{locale.title}</h1>
          </div>
          <div className='tab-bar-container'>
          {this.props.authenticated ? 
            <Tabs style={style} value={this.state.value} onChange={this.handleChange} >
              <Tab label={locale.tab_bar.home} />
              <Tab label={locale.tab_bar.configuration} />
              <Tab label={locale.tab_bar.editor} />
              <Tab label={locale.tab_bar.log} />
            </Tabs>
            : null}
          </div> 
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    selectedMainMenu: state.menu.selectedMainMenu,
    selectedMenu: state.menu.selectedMenu,
    selectedSubMenu: state.menu.selectedSubMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    mainMenuChange: menuItem => {
      dispatch(mainMenuChange(menuItem))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TopContainer))