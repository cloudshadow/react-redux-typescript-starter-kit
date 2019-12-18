/* tslint-disable */
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ActionType } from "typesafe-actions";
import rootAction from '../actions';
import TemplateComponent from '../components/Template/TemplateComponent';
import { IAppState } from '../reducers';
import { ITemp } from '../types/TemplateTypes';

type RootActions = ActionType<typeof rootAction>;
interface ITemplateProps{
  getThunk: () => void;
  fetchEpicRequest: () => void;
  fetchThunk: () => void;
  templateState: ITemp;
}

const TemplatePage = (props: ITemplateProps) => {
  return (
    <TemplateComponent
      fetchThunk={props.fetchThunk}
      fetchEpicRequest={props.fetchEpicRequest}
      templateState={props.templateState}
    />
  );
};

const mapStateToProps = (state:IAppState) => {
  return {
    templateState: state.templateState,
  };
};

interface IMapDispatchToProps {
  fetchThunk: (args: ITemp) => void;
  fetchEpicRequest: () => void;
}
const mapDispatchToProps = (dispatch: Dispatch<RootActions>):IMapDispatchToProps => ({
  fetchThunk: (args) => dispatch(rootAction.templateActions.fetchThunk(args)),
  fetchEpicRequest: () => dispatch(rootAction.templateActions.fetchEpicAsync.request()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TemplatePage);