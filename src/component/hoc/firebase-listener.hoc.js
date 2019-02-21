import React from 'react'
import { readDocument } from '../../firebase/firebase'

export const withFirebaseListener = (WrappedComponent, path) => {
  return class extends React.Component {

    constructor(props) {
      super(props)
      this.listener = this.listener.bind(this)
    }

    listener = () => readDocument(path(this.props.selectedCustomer), snapshot => {
      if(snapshot.exists) {
        this.setState(snapshot.data())
      }
    })

    componentDidMount = () => {
      this.unsubscribe = this.listener()
    }

    componentWillUnmount = () => {
      this.unsubscribe()
    }

    render = () => {
      return <WrappedComponent {...this.state} {...this.props} />;
    }
  }
}