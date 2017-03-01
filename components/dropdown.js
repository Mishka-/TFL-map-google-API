var BikePointsSelector = React.createClass({
    getInitialState: function() {
        return {
            value: 10
        }
    },
    change: function(event){
        this.setState({value: event.target.value});
        changeBikePointsCount(event.target.value);
    },
    render: function() {
        return (

            <div>
                <input type="number"  onChange={this.change} value={this.state.value}/>
            </div>

        );
    }
});

ReactDOM.render(<BikePointsSelector />, document.getElementById("bikes"));

var StopPointsSelector = React.createClass({
    getInitialState: function() {
        return {
            value: 10
        }
    },

    change: function(event){
        this.setState({value: event.target.value});
        changeStopPointsCount(event.target.value);
    },

    render: function() {
        return (
            <div>
                <input type="number"  onChange={this.change} value={this.state.value}/>
            </div>

        );
    }
});

ReactDOM.render(<StopPointsSelector />, document.getElementById("stops"));
