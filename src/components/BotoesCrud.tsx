import * as React from 'react';

import BotaoSubmit from './BotaoSubmit'
import BotaoVoltar from './BotaoVoltar'

interface BotoesCrudProps{
  labelCadastrar: string;
  linkVoltar: string;
  submitting: boolean;
  pristine: boolean;
}

export default class BotoesCrud extends React.Component<BotoesCrudProps, any> {
  public render() {
    const { labelCadastrar, linkVoltar, submitting, pristine} = this.props;
    return (
        <div className="mt-3">
            <BotaoSubmit labelCadastrar={labelCadastrar} submitting={submitting} pristine={pristine} />
            <BotaoVoltar linkVoltar={linkVoltar}/>
        </div>
    );
  }
}
