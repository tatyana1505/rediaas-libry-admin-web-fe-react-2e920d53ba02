import React from 'react'
// import RecoverEmail from './component/recover-email/recover-email.component'
import ResetPassword from './reset-password.component'
// import VerifyEmail from './component/verify-email/verify-email.component'

// mode - The user management action to be completed
// oobCode - A one-time code, used to identify and verify a request
// apiKey - Your Firebase project’s API key, provided for convenience

const Action = (props) => {
  const queryString = require('../minify-hack/index')
  const query = queryString.parse(props.location.search)

  // Get the action to complete.
  const mode = query.mode;

  // Get the one-time code from the query parameter.
  const actionCode = query.oobCode;

  // Handle the user management action.
  switch (mode) {
    case 'recoverEmail':
      // Display email recovery handler and UI.
      // return <RecoverEmail actionCode={actionCode} />;
    case 'resetPassword':
      // Display reset password handler and UI.
      console.log(mode)
      console.log(actionCode)
      return<ResetPassword actionCode={actionCode} />;
    case 'verifyEmail':
      // Display email verification handler and UI.
      // return <VerifyEmail actionCode={actionCode} />;
    default:
      // Error: invalid mode.
      return (
        <div className="Action">
        {console.log('testhest')}
          <h1>Error encountered</h1>
          <p>The selected page mode is invalid.</p>
        </div>
      );
  }
}

export default Action;
