import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ActionType } from 'typesafe-actions';
import rootAction from '@/actions';
import HomeComponent from '@/components/Home/HomeComponent';
import { RootState } from '@/types/GlobalTypes';
import { ITitle } from '@/types/HomeTypes';

type RootActions = ActionType<typeof rootAction>;
interface IHomeProps {
  getThunkTitle: () => void;
  fetchTitleEpicRequest: () => void;
  fetchTitleThunk: () => void;
  homeState: ITitle;
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
    homeState: state.homeState,
  };
};

interface IMapDispatchToProps {
  fetchTitleThunk: (args: ITitle) => void;
  fetchTitleEpicRequest: () => void;
}
const mapDispatchToProps = (dispatch: Dispatch<RootActions>): IMapDispatchToProps => ({
  fetchTitleThunk: (args) => dispatch(rootAction.homeActions.fetchTitleThunk(args)),
  fetchTitleEpicRequest: () => dispatch(rootAction.homeActions.fetchTitleEpicAsync.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
