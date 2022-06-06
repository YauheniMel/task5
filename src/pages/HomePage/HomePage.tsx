import {
  AppBar, Badge, IconButton, Toolbar, Typography,
} from '@mui/material';
import React, { FC } from 'react';
import MailIcon from '@mui/icons-material/Mail';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import classes from './HomePage.module.scss';
import DialogModal from '../../components/DialogModal/DialogModal';

const HomePage: FC<any> = function HomePage({
  data,
  name,
  sendMessage,
  id,
  users,
}) {
  function getRecievedMessages(arr: any): number {
    let counter = 0;
    if (!arr.length) return counter;
    arr.forEach((item: any) => {
      // eslint-disable-next-line eqeqeq
      if (item.id == id) {
        counter += item.sent.filter(
          (msg: any) => msg.state === 'untouched',
        ).length;
      }

      if (item.received) {
        counter += item.received.filter(
          (msg: any) => msg.state === 'untouched',
        ).length;
      }
    });

    return counter;
  }

  const [isOpen, setIsOpen] = React.useState(true);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <DialogModal
        id={id}
        data={data}
        users={users}
        isOpen={isOpen}
        close={handleClose}
        sendMessage={sendMessage}
      />
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <div>
            <Typography variant="h6" noWrap>
              {name}
            </Typography>
            <IconButton size="large" onClick={() => setIsOpen(true)}>
              <ForwardToInboxIcon color="secondary" sx={{ fontSize: 30 }} />
            </IconButton>
          </div>
          <div>
            <div>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge
                  badgeContent={getRecievedMessages(data)}
                  color="secondary"
                >
                  <MailIcon />
                </Badge>
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HomePage;
