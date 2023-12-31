import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getLeads, deleteLead } from '../../actions/leads'
import leads from '../../reducers/leads'

class Leads extends Component {
    static propTypes = {
        leads: PropTypes.array.isRequired,
        getLeads: PropTypes.func.isRequired,
        deleteLead: PropTypes.func,
    }

    componentDidMount() {
        this.props.getLeads()
    }

    render() {
        return (
            <Fragment>
                <h2>Leads</h2>
                {
                    leads ? (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                    <th />
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.leads.map(lead => (
                                        <tr key={lead.id}>
                                            <td>{lead.id}</td>
                                            <td>{lead.name}</td>
                                            <td>{lead.email}</td>
                                            <td>{lead.message}</td>
                                            <td>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={this.props.deleteLead.bind(this, lead.id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    ) : (
                        <h2 className="text-center">There's no lead</h2>
                    )
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    leads: state.leads.leads
})

const mapDispatchToProps = {
    getLeads,
    deleteLead,
}

export default connect(mapStateToProps, mapDispatchToProps)(Leads)

