import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ChatNotification from "./ChatNotification";
import { calcNumUnread } from "../utils/helperFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
  },
  notificationBadge: {
    background: "#3A8DFF",
    fontSize: 11,
    color: "white",
    borderRadius: 15,
    padding: "5px 9px",
    marginTop: "auto",
    marginBottom: "auto",
    fontWeight: "bold",
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;

  const numUnread = calcNumUnread(conversation.messages, conversation.otherUser.id);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>{otherUser.username}</Typography>
        <Typography className={classes.previewText}>{latestMessageText}</Typography>
      </Box>
      <ChatNotification numUnread={numUnread} />
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    conversation:
      state.conversations && state.conversations.find((conversation) => conversation.id === ownProps.convoId),
  };
};
export default connect(mapStateToProps, null)(ChatContent);
