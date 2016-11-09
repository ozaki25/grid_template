import React from 'react'
import _ from 'underscore'
import ReactGridRow from './ReactGridRow'
import ReactGridHeader from './ReactGridHeader'

class ReactGrid extends React.Component {
    render() {
        const collection = this.props.collection
        const columns = this.props.columns
        const headerList = _.pluck(columns, 'label')
        return (
            <table className="table">
                <ReactGridHeader headerList={ headerList }/>
                <tbody>
                    { _.map(collection, (row, i) => <ReactGridRow key={ i } row={ row } columns={ columns } />) }
                </tbody>
            </table>
        )
    }
}

module.exports = ReactGrid
