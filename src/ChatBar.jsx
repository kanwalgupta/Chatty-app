import React, { Component } from "react";

class ChatBar extends Component {
  onKeyDown = (event)=>{
  	if(event.key === "Enter"){
  		this.props.addNewMessage(event.target.value);
  	}
  }
  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username" 
          placeholder="Your Name (Optional)" defaultValue={this.props.userName}
        />
        <input
          className="chatbar-message" onKeyDown={this.onKeyDown}
          placeholder="Type a message and hit ENTER" 
        />
      </footer>
    );
  }
}
export default ChatBar;
