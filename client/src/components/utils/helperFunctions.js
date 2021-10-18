
export const tagLastMessage = (messages, userId) => {

  let message = messages.find((message) => message.isLast === true);
  if (message) {
    message.isLast = false;
  }

  for (var i = messages.length - 1; i >= 0; i--) {
    if (messages[i].senderId === userId && messages[i].isSeen === true) {
      messages[i].isLast = true;
      break;
    }
  }
};

export const calcNumUnread = (messages, otherUserId) => {
  let numUnread = 0;
  for (var i = messages.length - 1; i >= 0; i--) {
    if (!messages[i].isSeen && messages[i].senderId === otherUserId) {
      numUnread++;
    } else break;
  }
  return numUnread;
};
