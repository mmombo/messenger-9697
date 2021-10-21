export const tagLastMessage = (messages, otherUserId) => {
  //find and set old last message sent by user to false
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].senderId !== otherUserId && messages[i].isLast === true) {
      messages[i].isLast = false;
      break;
    }
  }
  //find and set new last message sent by user
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].senderId !== otherUserId && messages[i].isSeen === true) {
      let newMessage = { ...messages[i] };
      newMessage.isLast = true;
      messages[i] = newMessage;
      break;
    }
  }
};
export const calcNumUnread = (messages, otherUserId) => {
  let numUnread = 0;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (!messages[i].isSeen && messages[i].senderId === otherUserId) {
      numUnread++;
    } else break;
  }
  return numUnread;
};
