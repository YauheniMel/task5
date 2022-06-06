import React, { FC } from 'react';
import { connect } from 'react-redux';
import {
  sendMessageThunk,
  setTouchedMsgThunk,
} from '../../redux/reducers/auth-reducer';
import HomePage from './HomePage';

const HomePageContainer: FC<any> = function ({
  name,
  data,
  sendMessage,
  id,
  users,
  setTouchedMsg,
}) {
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
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
