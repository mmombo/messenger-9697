import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { connect } from "react-redux";
import { putMessage } from "../../store/utils/thunkCreators";
import { tagLastMessage } from "../utils/helperFunctions";

const Messages = (props) => {
  const { otherUser, userId, putMessage } = props;

  const messages = props.conversation.messages;
  tagLastMessage(messages, userId);
  
  
   for (var i = messages.length - 1; i >= 0; i--) {
     if (messages[i].senderId !== userId && messages[i].isSeen === false) {
       putMessage(messages[i]);
     } else break;
   }

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            isLast={message.isLast}
            isSeen={message.isSeen}
            OtherUserPhotoUrl={otherUser.photoUrl}
          />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    putMessage: (message) => {
      dispatch(putMessage(message));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    conversation:
      state.conversations &&
      state.conversations.find((conversation) => conversation.otherUser.username === state.activeConversation),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Messages);
