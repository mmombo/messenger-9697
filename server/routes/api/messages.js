const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, conversationId, sender, isSeen } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, conversationId, isSeen });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(senderId, recipientId);

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
      isSeen,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});
router.put("/read-status/:id", async (req, res, next) => {
  try {
    if (!req.user || req.user.dataValues.id !== req.body.senderId) {
      return res.sendStatus(401);
    }

    const { id } = req.params;
    const { isSeen } = req.body;

    const message = await Message.update(
      { isSeen: isSeen },
      {
        where: {
          id: id,
        },
      }
    );

    res.json({ message });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
