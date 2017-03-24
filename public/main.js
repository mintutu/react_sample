function getName(myName) {
	alert(myName);
}

var List = React.createClass({
	add() {
		this.state.array.push(this.state.message);
		this.setState({array: this.state.array})
	},
	getInitialState() {
		return {array: ["Math", "Physic", "Chemist", "Geography"], message: ''}
	},
	handleChange: function(event) {
    	this.setState({message: event.target.value});
  	},
	render: function() {
		var message = this.state.message;
		return (
			<div>
				<button onClick={this.add}>Add</button>
				<input type="text" value={message} onChange={this.handleChange} />
				{
					this.state.array.map((element, index) => {
						return <p key={index}>{element}</p>
					})
				}
			</div>
		);
	}
});

var Album = React.createClass({
	getInitialState() {
		return {image: 2};
	},
	next() {
		this.setState({image: this.state.image === 3 ? 1 : this.state.image+1});
	},
	render: function () {
		return (
			<div className="div-album">
				<img src= {"assets/images/" + this.state.image + ".png"} />
				<hr/>
				<div className="btn">
					<button onClick={this.next}>Next</button>
					<button>Previous</button>
				</div>
			</div>
		);
	}
});

var ReactComponent = React.createClass({
	addNumber() {
		this.setState({numbers: this.state.numbers + 1});
	},
	getInitialState() {
		return {num1: 0, num2: 0, result: 0}
	},
	getInfo: function() {
		alert(this.props.children)
	},
	render: function(){
		return (
			<div>
			<p>Result: {this.state.result}</p>

			</div>
			);
	}
});


ReactDOM.render(
	<div>
		<List/>
	</div>
	, document.getElementById("root"));
