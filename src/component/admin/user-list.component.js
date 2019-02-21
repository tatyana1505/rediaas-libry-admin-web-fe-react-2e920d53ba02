import React, { Component } from 'react'
import _ from 'lodash'

class UserList extends Component {
  
  buildUserList = () => {
    if(this.props.users) {
      let result = []
      _.each(this.props.users, (user, index) => {
        result.push(
          <div className='user-list-component-item' key={index}>
            <div className='div-33'>{user.name}</div>
            <div className='div-33'>{user.email}</div>
            <div className='div-23'>{user.role}</div>
            <div className='div-11'>{user.enabled ? 'aktiv' : 'ikke aktiv'}</div>
          </div>
        )
      })
      return result
    }
    return null
  }
  
  render = () => (
    <div className='user-list-component'>
      {this.buildUserList()}
    </div>
  )
}

export default UserList