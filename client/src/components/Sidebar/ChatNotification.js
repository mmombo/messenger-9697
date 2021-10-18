import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  notificationBadge: {
    background: "#3A8DFF",
    fontSize: 11,
    color: "white",
    borderRadius: 15,
    padding: "4.7px 9px",
    marginTop: "auto",
    marginBottom: "auto",
    fontWeight: "bold",
    marginRight: "10%",
  },
}));

const ChatNotification = (props) => {
  const classes = useStyles();
  const { numUnread } = props;

  return numUnread === 0 ? null : <div className={classes.notificationBadge}>{numUnread}</div>;
};
export default ChatNotification;
