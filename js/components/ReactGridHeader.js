import React from 'react'
import _ from 'underscore'

class ReactGridHeader extends React.Component {
    render() {
        const headerList = this.props.headerList
        return (
            <thead>
                <tr>
                    { _.map(headerList, (header, i) => <th key={ i }>{ header }</th>) }
                </tr>
            </thead>
        )
    }
}

module.exports = ReactGridHeader
