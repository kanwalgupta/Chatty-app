import React, { Component } from "react";
import Message from "./Message.jsx";

class MessageList extends Component {


  render() {
     const messageList = this.props.messages.map((message,index)=>
    { console.log("usercolor",message.color);
	  return	<Message type={message.type} userColor={message.color} userName = {message.username} content={message.content} key={index}/>
   } );
	 
	return (
      <main className="messages">
        {messageList}
      </main>
    );
  }
}
export default MessageList;