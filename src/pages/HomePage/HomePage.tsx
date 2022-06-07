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
  function setTouched(newData: any) {
    const db = data.map((elem: any) => {
      if (+elem.id === +newData.id) {
        const n = elem.received.map((msg: any) => {
          if (
            newData.received.find(
              (touchedMsg: any) => +touchedMsg.date === +msg.date,
            )
          ) {
            // eslint-disable-next-line no-param-reassign
            msg.state = 'touched';
          }
          return msg;
        });
        // eslint-disable-next-line no-param-reassign
        elem.received = n;
      }
      return elem;
    });
    setTouchedMsg({ id, JSON: JSON.stringify(db) });
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
      if (!item.received) return { id: item.id, name: item.name, received: [] };

      return {
        id: item.id,
        name: item.name,
        received: item.received.filter((msg: any) => msg.state === 'untouched'),
      };
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
                messages={prepareMessagesInfo(data)}
                id={id}
                data={data}
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
