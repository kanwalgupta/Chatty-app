import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import conversations from './conversations.json';




class App extends Component {
  constructor(props){
  	super(props);
  	this.state = {    currentUser: {name: "Bob"},
                      messages: []
    };
  	this.addNewMessage = this.addNewMessage.bind(this);

  }
  addNewMessage = (msg)=>{
  	console.log("inside function",this.connectionSocket);
  	const newMessage = {
  		username: this.state.currentUser.name,
  		content: msg
  	}
  	// const messages = this.state.conversations[0].messages.concat(newMessage);
  	// this.state.conversations[0].messages= messages;
    // this.setState({conversations});
    this.connectionSocket.send(JSON.stringify(newMessage));

  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.connectionSocket = new WebSocket("ws://localhost:3001");
    this.connectionSocket.onopen = function (event) {
      // this.connectionSocket.send("Here's some text that the server is urgently awaiting!"); 
      console.log("Connected to Server");
    };
    this.connectionSocket.onmessage = (event) => {
      
      let incomingMessage = JSON.parse(event.data);
      let messagesConcat = this.state.messages.concat(incomingMessage);
        this.setState({currentUser: this.state.currentUser,
        messages:messagesConcat});

    };
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    // const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    // const messages = this.state.conversations[0].messages.concat(newMessage);
    // this.state.conversations[0].messages= messages;

    // // Update the state of the app component.
    // // Calling setState will trigger a call to render() in App and all child components.
    // this.setState({conversations}); 
  }, 3000);
}

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">
            Chatty
          </a>
        </nav>
        <MessageList  messages = { this.state.messages } />
        <ChatBar addNewMessage={this.addNewMessage} userName = { this.state.currentUser.name } />
      </div>
    );
  }
}
export default App;