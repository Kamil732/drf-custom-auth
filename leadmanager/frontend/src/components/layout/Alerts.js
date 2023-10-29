import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { withAlert } from 'react-alert'
import PropTypes from 'prop-types'

class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired,
    }

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props
        if (error !== prevProps.error) {
            error.msg.name && alert.error(`Username: ${error.msg.name.join()}`)
            error.msg.email && alert.error(`Email: ${error.msg.email.join()}`)
            error.msg.message && alert.error(`Message: ${error.msg.message.join()}`)

            error.msg.username && alert.error(`Username: ${error.msg.username.join()}`)
            error.msg.password && alert.error(`Password: ${error.msg.password.join()}`)

            error.msg.non_field_errors && alert.error(`Error: ${error.msg.non_field_errors.join()}`)
            error.msg.detail && alert.error(`Error: ${error.msg.detail}`)
        }

        if (message !== prevProps.message) {
            message.deleteLead && alert.success(message.deleteLead)
            message.addLead && alert.success(message.addLead)
            message.passwordNotMatch && alert.error(message.passwordNotMatch)
        }
    }

    render() {
        return <Fragment />
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages,
})

export default connect(mapStateToProps)(withAlert()(Alerts))