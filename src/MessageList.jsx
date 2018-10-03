import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {


  render() {
  	 const messageList = this.props.messages.map((message,index)=>
	  	<Message  userName = {message.username} content={message.content} key={index}/>
	  );
	 
	return (
      <main className="messages">
        {messageList}
      </main>
    );
  }
}
export default MessageList;