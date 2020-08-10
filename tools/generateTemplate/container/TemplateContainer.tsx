import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { ActionType } from 'typesafe-actions';
import rootAction from '@tempPath/actions';
import TemplateComponent from '@tempPath/components/Template/TemplateComponent';
import { RootState } from '@tempPath/types/GlobalTypes';
import { ITemplateState } from '@tempPath/types/TemplateTypes';

type RootActions = ActionType<typeof rootAction>;
interface ITemplateProps {
  getThunk: () => void;
  fetchEpicRequest: () => void;
  fetchThunk: () => void;
  templateState: ITemplateState;
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

const mapStateToProps = (state: RootState) => {
  return {
    templateState: state.template,
  };
};

interface IMapDispatchToProps {
  fetchThunk: (args: ITemplateState) => void;
  fetchEpicRequest: () => void;
}
const mapDispatchToProps = (dispatch: Dispatch<RootActions>): IMapDispatchToProps => ({
  fetchThunk: (args: ITemplateState) => dispatch(rootAction.templateActions.fetchThunk(args)),
  fetchEpicRequest: () => dispatch(rootAction.templateActions.fetchEpicAsync.request()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TemplatePage);
