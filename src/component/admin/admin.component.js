import React, { Component } from 'react'
import { locale } from '../../i18n/da.locale'
import { readCollection, setDocument, readDocument, updateDocument, readCollectionWhere, pathCustomers, pathUsers, pathCountryAndLanguages, pathProducts, deleteDocument, createCustomerModel, deleteCustomerModel } from '../../firebase/firebase'
import Card from '../card.component'
import CustomerItem from './customer-item.component'
import UserList from './user-list.component'
import { TextField, MenuItem, Button } from '@material-ui/core'
import { connect } from 'react-redux'
import { Grid, Column, Row } from '../grid/grid.component'
import { customerChange } from '../../redux/customer/actions'
import CircularIntegration from '../circular-integration.component'
import Select from 'react-select'
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Input from '@material-ui/core/Input';
import 'react-select/dist/react-select.css';
import Modal from '@material-ui/core/Modal';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import * as firebase from 'firebase'

class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

function SelectWrapped(props) {
  const { classes, ...other } = props;

  return (
    <Select
      clearable={false}
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      valueComponent={valueProps => {
        const { children } = valueProps;
        return <div className="Select-value">{children}</div>;
      }}
      {...other}
    />
  );
}

const roles = [
  {
    value: 'customer',
    label: 'Customer',
  },
  {
    value: 'admin',
    label: 'Administrator',
  },
];

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function validateEmail(email) {
  var regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(String(email).toLowerCase());
}

class Admin extends Component {

  constructor(props) {
    super(props)
    this.state = {
      customers: [],
      customerMap: {},
      selectedCustomer: '',
      showCreateNewCustomer: false,
      usersForSelectedCustomer: [],
      usersLoading: true,
      productsLoading: true,
      generalSettingsLoading: true,
      loading: true,
      single: '',
      showModal: false,
      showPassword: false,
      showVerifyPassword: false,
      role: 'customer',
      name: '',
      email: '',
      password: '',
      passwordVerify: '',
      passwordError: false,
      fillError: false,
      passwordLengthError: false,
      emailError: false,
    }
    this.deleteCustomer = this.deleteCustomer.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  unsubscribe = () => {
    this.unsubscribeUsers && this.unsubscribeUsers()
    this.unsubscribeGeneralSettings && this.unsubscribeGeneralSettings()
    this.unsubscribeProducts && this.unsubscribeProducts()
    this.unsubscribeCustomers && this.unsubscribeCustomers()
  }

  subscribe = selectedCustomerId => {
    if (selectedCustomerId) {
      this.unsubscribeUsers = readCollectionWhere(pathUsers, { field: 'customerId', operator: '==', value: selectedCustomerId }, snapshot => {
        let users = []
        snapshot.forEach(doc => {
          users.push(doc.data())
        })
        this.setState({ usersForSelectedCustomer: users, selectedCustomer: selectedCustomerId, usersLoading: false })
      })
      this.unsubscribeProducts = readCollection(pathProducts(selectedCustomerId), snapshot => {
        let enabledProducts = {}
        snapshot.forEach(doc => {
          enabledProducts[doc.id] = true
        })
        this.setState({ enabledProducts: enabledProducts, productsLoading: false })
      })
      this.unsubscribeGeneralSettings = readDocument(pathCountryAndLanguages(selectedCustomerId), snapshot => {
        this.setState({ country: snapshot.data() ? snapshot.data().country : '', generalSettingsLoading: false })
      })
    }
    this.unsubscribeCustomers = readCollection(pathCustomers, snapshot => {
      let customersMap = {}
      let customersArray = []
      snapshot.forEach(doc => {
        customersMap[doc.id] = doc.data()
        customersArray.push({ label: doc.data().name, value: doc.id })
      });
      this.setState({ customerMap: customersMap, customers: customersArray, usersLoading: false, productsLoading: false, generalSettingsLoading: false, loading: false })
    })
  }

  handleChange = prop => event => {
    let enabled = Object.assign({}, this.state.enabledProducts)
    enabled[prop] = event.target.checked
    this.setState({ enabledProducts: enabled });
  }

  handleChangeInCustomer = prop => event => {
    let customer = Object.assign({}, this.state.customerMap[this.state.selectedCustomer])
    let customerMap = Object.assign({}, this.state.customerMap)
    customer[prop] = event.target.value
    customerMap[this.state.selectedCustomer] = customer
    this.setState({ customerMap: customerMap });
  };

  handleOnBlurInCustomer = prop => {
    let customer = this.state.customerMap[this.state.selectedCustomer]
    if (customer[prop] !== undefined) {
      updateDocument(`${pathCustomers}/${this.state.selectedCustomer}`, { [prop]: customer[prop] })
    }
  }

  handleSelectChange = prop => event => {
    let selectedCustomerId = event.target.value
    this.unsubscribe()
    this.subscribe(selectedCustomerId)
    this.setState({ [prop]: selectedCustomerId, usersLoading: true, productsLoading: true, generalSettingsLoading: true })
    this.props.changeCustomer(selectedCustomerId)
  }

  componentDidMount = () => {
    this.subscribe(this.props.selectedCustomer)
  }

  componentWillUnmount = () => {
    this.unsubscribe()
  }

  cancelCreateCustomer = () => {
    this.setState({ selectedCustomer: '', showCreateNewCustomer: false })
  }

  createCustomer = () => {
    this.setState({ showCreateNewCustomer: false, selectedCustomer: this.state.customerMap[this.state.selectedCustomer].customerId })
    setDocument(`${pathCustomers}/${this.state.customerMap[this.state.selectedCustomer].customerId}`, this.state.customerMap[this.state.selectedCustomer], () => {
      this.setState({ selectedCustomer: this.state.customerMap[this.state.selectedCustomer].customerId })
      this.props.changeCustomer(this.state.customerMap[this.state.selectedCustomer].customerId)
      createCustomerModel(this.state.customerMap[this.state.selectedCustomer].customerId)
    })
  }

  deleteCustomer = () => {
    deleteDocument(`${pathCustomers}/${this.state.customerMap[this.state.selectedCustomer].customerId}`, () => {
      this.setState({ selectedCustomer: '' })
      this.props.changeCustomer('')
    })
    deleteCustomerModel(this.state.customerMap[this.state.selectedCustomer].customerId)
  }

  handleSelectChange = name => value => {
    let selectedCustomerId = value
    this.unsubscribe()
    this.subscribe(selectedCustomerId)
    this.setState({ [name]: selectedCustomerId, usersLoading: true, productsLoading: true, generalSettingsLoading: true })
    this.props.changeCustomer(selectedCustomerId)
    this.setState({
      [name]: selectedCustomerId,
      loading: true
    });
  };

  handleChangeInputs = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleClickShowVerifyPassword = () => {
    this.setState({ showVerifyPassword: !this.state.showVerifyPassword });
  };

  createUser = () => {
    var submittedEmail = this.state.email
    var submittedPassword = this.state.password
    if (this.state.name !== '' && this.state.email !== '' && this.state.password !== '' && this.state.passwordVerify !== '') {
      if (validateEmail(submittedEmail)) {
        if (this.state.password.length >= 6 && this.state.passwordVerify.length >= 6) {
          if (this.state.password === this.state.passwordVerify) {
            var createNewDatabaseUser = firebase.functions().httpsCallable('createNewDatabaseUser');
            createNewDatabaseUser({
              customerId: this.state.selectedCustomer,
              email: this.state.email,
              enabled: true,
              language: 'dan',
              name: this.state.name,
              role: this.state.role,
            })
              .then(function (result) {
                var newUserId = result.data.Id;
                console.log("Resulting ID from createNewDatabaseUser: ", newUserId)

                var createNewAuthenticationUser = firebase.functions().httpsCallable('createNewAuthenticationUser');
                createNewAuthenticationUser({
                  email: submittedEmail,
                  uid: newUserId,
                  password: submittedPassword
                })
                  .then(function (result) {
                    console.log("Result from createNewAuthenticationUser: ", result.data.text)
                  })
                  .catch(function (error) {
                    var code = error.code;
                    var message = error.message;
                    var details = error.details;
                    console.error('There was an error when calling the Cloud Function', error);
                    deleteDocument(`${pathUsers}/${newUserId}`)
                    window.alert('There was an error when calling the Cloud Function:\n\nError Code: '
                      + code + '\nError Message:' + message + '\nError Details:' + details);
                  });
              })
              .then(() => this.setState({
                showModal: false,
                name: '',
                email: '',
                password: '',
                passwordVerify: '',
                passwordError: false,
                passwordLengthError: false,
                fillError: false,
                emailError: false,
              }))
              .catch(function (error) {
                var code = error.code;
                var message = error.message;
                var details = error.details;

                console.error('There was an error when calling the Cloud Function', error);
                window.alert('There was an error when calling the Cloud Function:\n\nError Code: '
                  + code + '\nError Message:' + message + '\nError Details:' + details);
              });
          }
          else {
            this.setState({
              passwordError: true,
              passwordLengthError: false,
              emailError: false,
              fillError: false,
            })
          }
        }
        else {
          this.setState({
            passwordError: false,
            passwordLengthError: true,
            emailError: false,
            fillError: false,
          })
        }
      }
      else {
        this.setState({
          passwordError: false,
          passwordLengthError: false,
          emailError: true,
          fillError: false,
        })
      }
    }
    else {
      this.setState({
        passwordError: false,
        passwordLengthError: false,
        emailError: false,
        fillError: true,
      })
    }
  }

  render = () => {
    return (
      <div className='admin-component'>
        <h1>{locale.admin.title}</h1>
        <div>
          {this.state.loading || (this.state.selectedCustomer && (this.state.usersLoading || this.state.productsLoading || this.state.generalSettingsLoading)) ? (
            <div className='circular-center-wrapper'>
              <CircularIntegration />
            </div>
          ) : (
              <div>
                <Card>
                  <Grid>
                    <Column>
                      <Row>
                        <Column>
                          <div className='modal-element-wrapper'>
                            <Input className='Select-input'
                              fullWidth
                              inputComponent={SelectWrapped}
                              value={this.state.selectedCustomer}
                              onChange={this.handleSelectChange('single')}
                              placeholder={locale.admin.customer}
                              id="react-select-single"
                              inputProps={{
                                name: 'react-select-single',
                                instanceId: 'react-select-single',
                                simpleValue: true,
                                options: this.state.customers,
                              }}
                            >
                            </Input>
                          </div>
                        </Column>
                        <Column>
                          <div className='modal-button-wrapper'>
                            <Button
                              color={'primary'}
                              onClick={() => {
                                this.setState({ showCreateNewCustomer: true, selectedCustomer: '' })
                                this.props.changeCustomer('')
                              }}>{locale.admin.add_customer}</Button>
                          </div>
                        </Column>
                      </Row>
                    </Column>
                  </Grid>
                  {this.state.showCreateNewCustomer ? <CustomerItem new createCustomer={this.createCustomer} cancelCreateCustomer={this.cancelCreateCustomer} handleChange={this.handleChangeInCustomer} customer={this.state.customerMap[this.state.selectedCustomer]} handleOnBlur={() => { }} /> : null}
                  {this.props.selectedCustomer && !this.state.showCreateNewCustomer ? <CustomerItem customer={this.state.customerMap[this.props.selectedCustomer]} deleteCustomer={this.deleteCustomer} handleChange={this.handleChangeInCustomer} handleOnBlur={this.handleOnBlurInCustomer} country={this.state.country} enabledProducts={this.state.enabledProducts} /> : null}
                </Card>
                {this.state.usersForSelectedCustomer.length > 0 && this.props.selectedCustomer ?
                  <Card>
                    <UserList users={this.state.usersForSelectedCustomer} />
                    <div className='modal-button-wrapper'>
                      <Button
                        color={'primary'}
                        onClick={() => {
                          this.setState({ showModal: true })
                        }}>{locale.admin.modal.new_user}</Button>
                    </div>
                    <div>
                      <Modal
                        open={this.state.showModal}
                        onClose={() => {
                          this.setState({ showModal: false })
                        }}
                      >
                        <div style={getModalStyle()} className='modal-wrapper'>
                          <div className='modal-padding'>
                            <div className='modal-content'>
                              <Grid>
                                <Column>
                                  <Row>
                                    <Column>
                                      <div className='modal-title'>
                                        <Typography variant='title'> {locale.admin.modal.new_user} </Typography>
                                      </div>
                                    </Column>
                                  </Row>
                                  <Row>
                                    <Column>
                                      <div className='choose-role-wrapper'>
                                        <TextField
                                          fullWidth
                                          id="select-role"
                                          select
                                          label={locale.admin.modal.role}
                                          className={this.props.textField}
                                          value={this.state.role}
                                          onChange={this.handleChangeInputs('role')}
                                          SelectProps={{
                                            MenuProps: {
                                              className: this.props.menu,
                                            },
                                          }}
                                          margin="normal"
                                        >
                                          {roles.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                              {option.label}
                                            </MenuItem>
                                          ))}
                                        </TextField>
                                      </div>
                                    </Column>
                                  </Row>
                                  <Row>
                                    <Column>
                                      <div className='modal-element-wrapper'>
                                        <TextField
                                          fullWidth
                                          placeholder={locale.admin.modal.name}
                                          value={this.state.name}
                                          onChange={this.handleChangeInputs('name')}
                                        />
                                      </div>
                                    </Column>
                                  </Row>
                                  <Row>
                                    <Column>
                                      <div className='modal-element-wrapper'>
                                        <TextField
                                          fullWidth
                                          placeholder={locale.admin.modal.email}
                                          value={this.state.email}
                                          onChange={this.handleChangeInputs('email')}
                                        />
                                      </div>
                                    </Column>
                                  </Row>
                                  <Row>
                                    <Column>
                                      <div className='modal-element-wrapper'>
                                        <Input
                                          fullWidth
                                          id="adornment-password"
                                          type={this.state.showPassword ? 'text' : 'password'}
                                          value={this.state.password}
                                          placeholder={locale.admin.modal.password}
                                          onChange={this.handleChangeInputs('password')}
                                          endAdornment={
                                            <InputAdornment position="end">
                                              <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                                tabIndex='-1'
                                              >
                                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                              </IconButton>
                                            </InputAdornment>
                                          }
                                        />
                                      </div>
                                    </Column>
                                  </Row>
                                  <Row>
                                    <Column>
                                      <div className='modal-element-wrapper'>
                                        <Input
                                          fullWidth
                                          id="adornment-password-verify"
                                          type={this.state.showVerifyPassword ? 'text' : 'password'}
                                          value={this.state.passwordVerify}
                                          placeholder={locale.admin.modal.verify_password}
                                          onChange={this.handleChangeInputs('passwordVerify')}
                                          endAdornment={
                                            <InputAdornment position="end">
                                              <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowVerifyPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                                tabIndex='-1'
                                              >
                                                {this.state.showVerifyPassword ? <VisibilityOff /> : <Visibility />}
                                              </IconButton>
                                            </InputAdornment>
                                          }
                                        />
                                      </div>
                                    </Column>
                                  </Row>
                                  <Row>
                                    <Column>
                                      <div className='modal-button-wrapper'>
                                        <Button
                                          color={'primary'}
                                          onClick={this.createUser}
                                        >
                                          {locale.admin.modal.add_user}
                                        </Button>
                                      </div>
                                    </Column>
                                    <Column>
                                      <div className='modal-button-wrapper'>
                                        <Button
                                          color={'secondary'}
                                          onClick={() => {
                                            this.setState({
                                              showModal: false,
                                              name: '',
                                              email: '',
                                              password: '',
                                              passwordVerify: '',
                                              passwordError: false,
                                              passwordLengthError: false,
                                              fillError: false,
                                              emailError: false,
                                            })
                                          }}>{locale.admin.modal.cancel}</Button>
                                      </div>
                                    </Column>
                                  </Row>
                                  <Row>
                                    {this.state.passwordError || this.state.passwordLengthError || this.state.fillError || this.state.emailError ? (
                                      <Column>
                                        <div className='modal-error'>
                                          <Typography color={'error'}> {this.state.passwordError ? locale.admin.modal.mismatch : this.state.passwordLengthError ? locale.admin.modal.password_length : this.state.fillError ? locale.admin.modal.fill_all_fields : locale.admin.modal.email_error} </Typography>
                                        </div>
                                      </Column>
                                    ) : (
                                        undefined
                                      )}
                                  </Row>
                                </Column>
                              </Grid>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </div>
                  </Card> : null}
              </div>
            )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    selectedCustomer: state.customer.selectedCustomer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeCustomer: customer => {
      dispatch(customerChange(customer))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)

