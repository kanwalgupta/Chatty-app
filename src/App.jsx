import React, { Component } from "react";
import ChatBar from "./ChatBar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import conversations from "./conversations.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: "Bob" },
      messages: [],
      onlineUsers: 0
    };
    this.addNewMessage = this.addNewMessage.bind(this);
    this.updateUserName = this.updateUserName.bind(this);
  }

  generateRandomColor() {
    return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
  }
  updateUserName = username => {
    let newUser = {
      name: username
    };
    let newNotification = {
      type: "postNotification",
      username: username,
      content: `${
        this.state.currentUser.name
      } has changed their name to ${username}`
    };
    this.setState({
      currentUser: newUser,
      messages: this.state.messages,
      onlineUsers: this.state.onlineUsers
    });
    this.connectionSocket.send(JSON.stringify(newNotification));
  };
  addNewMessage = msg => {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: msg,
      color : this.userColor
    };
    console.log("sending with color",this.userColor);
    this.connectionSocket.send(JSON.stringify(newMessage));
  };

  componentDidMount() {
    console.log("componentDidMount <App />");
    this.connectionSocket = new WebSocket("ws://localhost:3001");
    this.connectionSocket.onopen = (event) => {
      // this.connectionSocket.send("Here's some text that the server is urgently awaiting!");
      console.log("Connected to Server");
      this.userColor = this.generateRandomColor();
      console.log(this.userColor);
    };
    this.connectionSocket.onmessage = event => {
      let incomingMessage = JSON.parse(event.data);
      console.log("user count", incomingMessage.type);
      if (incomingMessage.type === "onlineUsersUpdate") {
        this.setState({
          currentUser: this.state.currentUser,
          messages: this.state.messages,
          onlineUsers: incomingMessage.content
        });
      } else {
        let messagesConcat = this.state.messages.concat(incomingMessage);
        this.setState({
          currentUser: this.state.currentUser,
          messages: messagesConcat,
          onlineUsers: this.state.onlineUsers
        });
      }
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
          <span className="online-users">
            {this.state.onlineUsers} user(s) online
          </span>
        </nav>
        <MessageList messages={this.state.messages} />
        <ChatBar
          updateUserName={this.updateUserName}
          addNewMessage={this.addNewMessage}
          userName={this.state.currentUser.name}
        />
      </div>
    );
  }
}
export default App;
