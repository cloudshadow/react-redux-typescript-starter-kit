import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import rootAction from '@/actions';
import HomeComponent from '@/components/Home/HomeComponent';
import { RootAction, RootState } from '@/types/GlobalTypes';
import { IHomeState } from '@/types/HomeTypes';

interface IHomeProps {
  fetchTitleEpicRequest: () => void;
  fetchTitleThunk: () => void;
  homeState: IHomeState;
}

const HomePage = (props: IHomeProps) => {
  return (
    <HomeComponent
      fetchTitleThunk={props.fetchTitleThunk}
      fetchTitleEpicRequest={props.fetchTitleEpicRequest}
      homeState={props.homeState}
    />
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    homeState: state.home,
  };
};

interface IMapDispatchToProps {
  fetchTitleThunk: (args: IHomeState) => void;
  fetchTitleEpicRequest: () => void;
}
const mapDispatchToProps = (dispatch: Dispatch<RootAction>): IMapDispatchToProps => ({
  fetchTitleThunk: (args) => dispatch(rootAction.homeActions.fetchTitleThunk(args)),
  fetchTitleEpicRequest: () => dispatch(rootAction.homeActions.fetchTitleEpicAsync.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
