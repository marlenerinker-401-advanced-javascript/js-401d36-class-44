import * as React from 'react';
import * as SocketIOClient from 'socket.io-client';
import { Input, List, ListItem, Typography, Paper, Button, FormGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';


interface MessagesProps {
  title: string
}

interface Message {
  createdAt: string;
  text: string
}

const useStyles = makeStyles((theme) => ({

  
  heading: {
    display: 'flex',
    marginTop: '20px',
    fontSize: '20px',
    paddingLeft: '20px',
    fontFamily: "Roboto, Helvetica, Arial, sans serif",
  },

  heading2: {
    fontSize: '20px',
    fontFamily: "Roboto, Helvetica, Arial, sans serif",
  },

  messages: {
    margin: '20px',
  },

  list: {
    alignItem: 'center',
    justifyContent: 'center',
    paddingLeft: '10px',
    fontFamily: "Roboto, Helvetica, Arial, sans serif",
  },

  send: {
    margin: '20px',    
  },

  write: {
    paddingLeft: '24px',
    marginLeft: '20px',    
  },

}));



const Messages: React.FunctionComponent<MessagesProps> = (props: MessagesProps) => {

  const classes = useStyles();

  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [socket, setSocket] = React.useState<any>(null);

  React.useEffect((): void => {
    let socketClient: SocketIOClient.Socket = SocketIOClient('http://localhost:3000');
    socketClient.on('message', (results: Message[]) => {
      setMessages(results);
    });
    setSocket(socketClient);
  }, []);


  const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.currentTarget;
    setInput(value);
  }

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();

    const payload: Message = {
      createdAt: `${new Date()}`,
      text: input,
    }

    socket.emit('message', payload);

    setInput('');
  }

  console.log(messages);
  return (
    <>
    
      <Typography className={classes.heading} component="h4">{props.title}</Typography>
      <form onSubmit={handleSubmit}>
        <Input className={classes.write} type="text" value={input} placeholder="Write a message" onChange={handleInput} />
        <Button type="submit" className={classes.send} variant="outlined">Send</Button>
      </form>
        <Paper className={classes.messages}>
        <Typography className={classes.heading2}component="h3">Messages</Typography>
        <List className={classes.list}>{messages.map((data: Message, idx) => <ListItem key={idx}>{data.text}</ListItem>)}</List>  
        </Paper>
    </>
  );
}

export default Messages;