import React from 'react'
import _ from 'underscore'

class ReactGridRow extends React.Component {
    render() {
        const row = this.props.row
        const columns = this.props.columns
        return (
            <tr>
                { _.map(columns, (col, i) => {
                    const value = _.reduce(col.name.split('.'), (tmp, name) => tmp ? tmp[name] : '', row)
                    return <td key={ i }>{ value }</td>
                })}
            </tr>
        )
    }
}

module.exports = ReactGridRow
