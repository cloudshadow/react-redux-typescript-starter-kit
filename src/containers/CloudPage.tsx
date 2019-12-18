/* tslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ActionType } from "typesafe-actions";
import rootAction from '../actions';
import CloudComponent from '../components/Cloud/CloudComponent';
import { IAppState } from '../reducers';
import { ITemp } from '../types/CloudTypes';

type RootActions = ActionType<typeof rootAction>;
interface ICloudProps{
  getThunk: () => void;
  fetchEpicRequest: () => void;
  fetchThunk: () => void;
  cloudState: ITemp;
}

const CloudPage = (props: ICloudProps) => {
  return (
    <CloudComponent
      fetchThunk={props.fetchThunk}
      fetchEpicRequest={props.fetchEpicRequest}
      cloudState={props.cloudState}
    />
  );
};

const mapStateToProps = (state:IAppState) => {
  return {
    cloudState: state.cloudState,
  };
};

interface IMapDispatchToProps {
  fetchThunk: (args: ITemp) => void;
  fetchEpicRequest: () => void;
}
const mapDispatchToProps = (dispatch: Dispatch<RootActions>):IMapDispatchToProps => ({
  fetchThunk: (args) => dispatch(rootAction.cloudActions.fetchThunk(args)),
  fetchEpicRequest: () => dispatch(rootAction.cloudActions.fetchEpicAsync.request()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CloudPage);