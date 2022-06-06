import {
  AppBar, IconButton, Toolbar, Typography,
} from '@mui/material';
import React, { FC } from 'react';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import classes from './HomePage.module.scss';
import DialogModal from '../../components/DialogModal/DialogModal';
import NavMessages from '../../components/BoxMessage/NavMessage';

const HomePage: FC<any> = function HomePage({
  data,
  name,
  sendMessage,
  id,
  users,
  setTouchedMsg,
}) {
  function countRecievedMessages(arr: any): number {
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

  function setTouched(newData: any) {
    // eslint-disable-next-line array-callback-return
    const db = data.map((elem: any) => {
      if (+elem.id === +newData.id) {
        const n = newData.received.map((msg: any) => {
          // eslint-disable-next-line no-param-reassign
          msg.state = 'touched';
          return msg;
        });
        // eslint-disable-next-line no-param-reassign
        elem.received = n;
      }
      return elem;
    });
    console.log(db);

    setTouchedMsg({ id, JSON: JSON.stringify(db) });

    // setTouchedMsg({ id });
  }

  function prepareMessagesInfo(arr: any) {
    return arr.map((item: any) => {
      // eslint-disable-next-line no-param-reassign
      item.name = users.find((item2: any) => +item2.id === +item.id).name;
      // eslint-disable-next-line eqeqeq
      if (item.id == id) {
        // eslint-disable-next-line no-param-reassign
        item.received = item.sent;
      }
      return item;
    });
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
              <NavMessages
                count={countRecievedMessages(data)}
                messages={prepareMessagesInfo(data)}
                id={id}
                // eslint-disable-next-line react/jsx-no-bind
                setTouched={setTouched}
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default HomePage;
