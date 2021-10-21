import React from "react";
import { Box, Typography, Badge } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { calcNumUnread } from "../utils/helperFunctions";
import { useEffect, useState } from "react";

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
  badge: {
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: "20%",
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;
  const [numUnread, setNumUnread] = useState(0);

  useEffect(() => {
    setNumUnread(calcNumUnread(conversation.messages, conversation.otherUser.id));
  }, [conversation]);

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>{otherUser.username}</Typography>
        <Typography className={classes.previewText}>{latestMessageText}</Typography>
      </Box>
      <Badge badgeContent={numUnread} className={classes.badge} color="primary" />
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
