import React, { FC } from 'react';
import { connect } from 'react-redux';
import HomePage from './HomePage';

const HomePageContainer: FC<any> = function ({ name, data }) {
  return <HomePage name={name} data={data} />;
};

const mapStateToProps = (state: any) => ({
  name: state.auth.name,
  data: state.auth.db,
});

export default connect(mapStateToProps)(HomePageContainer);
