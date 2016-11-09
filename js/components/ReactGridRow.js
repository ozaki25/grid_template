import React from 'react'
import _ from 'underscore'

class ReactGridRow extends React.Component {
    render() {
        const row = this.props.row
        const values = _.values(row)
        return (
            <tr>
                { _.map(values, function(value, i) {
                    const attr = typeof value === 'object' ? '---' : value
                    return <td key={ i }>{ attr }</td>
                })}
            </tr>
        )
    }
}

module.exports = ReactGridRow
