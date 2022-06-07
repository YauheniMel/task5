import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { io } from 'socket.io-client';
import {
  sendMessageThunk,
  setTouchedMsgThunk,
  getDataAction,
} from '../../redux/reducers/auth-reducer';
import HomePage from './HomePage';

const HomePageContainer: FC<any> = function ({
  name,
  data,
  sendMessage,
  id,
  users,
  setTouchedMsg,
  getData,
}) {
  const socket = io('http://localhost:5000');
  const [newData, setNewData] = useState();
  const [newUsers, setNewUsers] = useState();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    socket.on('users', (data: any) => setNewUsers(data));
    // eslint-disable-next-line @typescript-eslint/no-shadow
    socket.on('db', (data: any) => setNewData(data));
    // eslint-disable-next-line @typescript-eslint/no-shadow
    socket.on('me', (data: any) => {
      const { id: resId, JSON: json } = JSON.parse(data);

      if (+resId === +id) {
        setNewData(json);
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-shadow
    socket.on('addressee', (data: any) => {
      const { id: resId, JSON: json } = JSON.parse(data);

      if (+resId === +id) {
        setNewData(json);
      }
    });

    if (newData) {
      getData({ db: JSON.parse(newData) });
    } else if (newUsers) {
      getData({ users: JSON.parse(newUsers) });
    }
  }, [newData, newUsers]);

  return (
    <HomePage
      name={name}
      data={data}
      sendMessage={sendMessage}
      id={id}
      users={users}
      setTouchedMsg={setTouchedMsg}
    />
  );
};

const mapStateToProps = (state: any) => ({
  name: state.auth.name,
  id: state.auth.id,
  data: state.auth.db,
  users: state.auth.users,
});
const mapDispatchToProps = (dispatch: any) => ({
  sendMessage: (data: any) => dispatch(sendMessageThunk(data)),
  setTouchedMsg: (data: any) => dispatch(setTouchedMsgThunk(data)),
  getData: (data: any) => dispatch(getDataAction(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
