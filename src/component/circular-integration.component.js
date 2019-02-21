import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import BookIcon from '@material-ui/icons/ImportContacts';

class CircularIntegration extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <div className={classes.innerWrapper}>
            <BookIcon className={classes.icon} />
          </div>
          <div className={classes.innerWrapper}>
            <CircularProgress size={68} className={classes.progress} />
          </div>
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
    height: '68px',
    width: '68px',
  },
  progress: {
    color: '#EF6C00',
  },
  icon: {
    fontSize: 36,
    position: 'relative',
    color: '#1e1f3b',    
    top: '14px',
    left: '16px',
    },
  innerWrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});


export default withStyles(styles)(CircularIntegration);
