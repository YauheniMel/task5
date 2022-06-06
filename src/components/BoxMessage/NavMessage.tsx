import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import { Badge, IconButton } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import ModalComponent from '../Modal/Modal';

const NavMessages: React.FC<any> = function ({ messages = [], count }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [open, setOpen] = React.useState<boolean>();
  const [newMessages, setNewMessages] = React.useState();

  const handleOpen = (e: any) => {
    setOpen(true);
    const msg = messages.find((elem: any) => {
      const { name } = elem;

      return name.toUpperCase() === e.target.innerText;
    });
    setNewMessages(msg);
  };
  const handleClose = () => setOpen(false);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const toggleDrawer = (open: boolean) => () => {
    setIsOpen(open);
  };

  const list = () => (
    <Box
      sx={{ width: '16vw' }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {messages.map((msg: any) => (
          <>
            <Button onClick={handleOpen}>{msg.name}</Button>
            <hr />
          </>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        onClick={toggleDrawer(true)}
        aria-label="show 4 new mails"
        color="inherit"
      >
        <Badge badgeContent={count} color="secondary">
          <MailIcon />
        </Badge>
      </IconButton>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
        {messages.length && list()}
      </Drawer>
      <ModalComponent
        handleClose={handleClose}
        open={open}
        newMessages={newMessages}
      />
    </div>
  );
};

export default NavMessages;
