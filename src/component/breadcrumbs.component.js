import React, { Component } from 'react'
import { routesTranslations } from '../config/routes.config'

class Breadcrumbs extends Component {
  
  paths = path => path.split('/')

  render = () => (
    <div className='breadcrumbs'>
      <div>
        {this.paths(this.props.path).map((item, i, arr) => {
          if(arr.length - 1 ===  i) {
            return <p key={item}>{routesTranslations[item]}</p>
          } else if(i > 0) {
            return <div key={item}><p>{routesTranslations[item]}</p><p>—</p></div>
          }
          return null
        })}
      </div>
    </div>
  )
}

export default Breadcrumbs