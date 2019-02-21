export const actions = {
  CUSTOMER_CHANGE: 'CUSTOMER/CUSTOMER_CHANGE'
}

export const customerChange = customer => ({
  type: actions.CUSTOMER_CHANGE,
  payload: {
    selectedCustomer: customer
  }
})