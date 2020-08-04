import React from 'react'
import Alert from "@material-ui/lab/Alert";
import PropTypes from 'prop-types';


const AlertMessage = props => <Alert severity={props.severity}>{props.children}</Alert>

AlertMessage.propTypes = {
    severity: PropTypes.string
}

export default AlertMessage