import React, { FC } from 'react';
import { connect } from 'react-redux';
import { sendMessageThunk } from '../../redux/reducers/auth-reducer';
import HomePage from './HomePage';

const HomePageContainer: FC<any> = function ({
  name, data, sendMessage, id,
}) {
  return <HomePage name={name} data={data} sendMessage={sendMessage} id={id} />;
};

const mapStateToProps = (state: any) => ({
  name: state.auth.name,
  id: state.auth.id,
  data: state.auth.db,
});
const mapDispatchToProps = (dispatch: any) => ({
  sendMessage: (data: any) => dispatch(sendMessageThunk(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
