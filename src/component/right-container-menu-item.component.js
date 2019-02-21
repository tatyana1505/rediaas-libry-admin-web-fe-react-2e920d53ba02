import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { submenuChange } from '../redux/menu/actions'


class RightContainerMenuItem extends Component {
  render = () => {
    return (
      <Link to={this.props.content.path.submenu ? this.props.content.path.submenu : ''} onClick={() => this.props.changeSubmenuItem(this.props.content.path.submenu, this.props.content.path.menu)}>
        <div className='right-container-menu-item'>
          <h2>{this.props.content.title}</h2>
          <h3>{this.props.content.subtitle}</h3>
        </div>
      </Link> 
    )
  }
}

const mapStateToProps = state => {
  return {
    menu: state.menu.selectedMenu,
    submenu: state.menu.selectedSubmenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeSubmenuItem: (submenuItem, menuItem) => {
      dispatch(submenuChange(submenuItem, menuItem))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RightContainerMenuItem)