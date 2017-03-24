var list;

var Note = React.createClass({
  getInitialState() {
    return {onEdited: false};
  },
  editNote() {
    this.setState({onEdited: true});
  },
  submitNote() {
    var note = this;
    $.post("/edit-note", {id: this.props.id, value: this.refs.text.value},
    function(data){
      list.setState({array: data});
      note.setState({onEdited: false});
    });
  },
  deleteNote() {
    $.post("/delete-note", {note: this.props.id}, function(data){
      list.setState({array: data});
    });
  },
  render: function() {
    if (this.state.onEdited) {
      return <div className="div-note">
        <input defaultValue={this.props.children} ref="text"/>
        <button onClick={this.submitNote}>Ok</button>
      </div>
    } else {
      return <div className="div-note">
        <p>{this.props.children}</p>
        <button onClick={this.deleteNote}>Delete</button>
        <button onClick={this.editNote}>Edit</button>
      </div>
    }
  },
});

var AddNote = React.createClass({
  sendNote() {
    $.post("/add-note", {note: this.refs.text.value}, function(data){
      list.setState({array: data});
    });
  },
  getInitialState() {
    return {array:[], message: ''}
  },
  render: function() {
    var message = this.state.message;
    return <div className="div-send">
            <button onClick={this.sendNote}>Send</button>
            <input type="text" ref="text" />
          </div>
  },
  componentDidMount: function() {
    $.get("/get-notes", function(data) {
      list.setState({array: data});
    });
  }
});

var List = React.createClass({
  getInitialState() {
    list = this;
    return {array: [], message: ""}
  },
  render: function() {
    return <div className="div-list">
        {this.state.array.map((element, index) =>
            {
              return <Note key={index} id={index}>{element}</Note>
            }
        )}

    </div>
  }
});

ReactDOM.render(
  <div>
    <List/>
    <br/>
    <AddNote/>
  </div>
  ,
  document.getElementById('root')
);
