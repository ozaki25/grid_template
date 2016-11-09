import React from 'react'
import _ from 'underscore'
import ReactGridRow from './ReactGridRow'

class ReactGrid extends React.Component {
    render() {
        const collection = this.props.collection
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                    </tr>
                </thead>
                <tbody>
                    { _.map(collection, function(row, i) {
                        return <ReactGridRow key={ i } row={ row } />
                    })}
                </tbody>
            </table>
        )
    }
}

module.exports = ReactGrid
