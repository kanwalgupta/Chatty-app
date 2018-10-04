import React, { Component } from "react";

class Message extends Component {
  render() {
    if(this.props.type === "incomingNotification"){
     return <div className="message-system">
        {this.props.content}
      </div> 
    }
    return (
      <div className="message">
        <span className="message-username">{this.props.userName}</span>
        <span className="message-content">
          {this.props.content}
        </span>
      </div>
    );
  }
}
export default Message;