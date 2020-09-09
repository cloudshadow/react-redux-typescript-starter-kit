import * as React from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import rootAction from '@tempPath/actions';
import TemplateComponent from '@tempPath/components/Template/TemplateComponent';
import { RootState } from '@tempPath/types/GlobalTypes';
import { ITemplateState } from '@tempPath/types/TemplateTypes';

const TemplatePage = () => {
  const dispatch = useDispatch();
  const templateState = useSelector<RootState, ITemplateState>((state) => state.template, shallowEqual);

  return (
    <TemplateComponent
      fetchThunk={(args) => dispatch(rootAction.templateActions.fetchThunk(args))}
      fetchEpicRequest={() => dispatch(rootAction.templateActions.fetchEpicAsync.request())}
      templateState={templateState}
    />
  );
};

export default TemplatePage;
