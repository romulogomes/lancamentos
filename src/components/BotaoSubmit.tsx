import * as React from 'react';

interface BotaoSubmitProps{
    labelCadastrar: string;
    submitting: boolean;
    pristine: boolean;
}
export default class BotaoSubmit extends React.Component<BotaoSubmitProps, any> {
  public render() {
    const { labelCadastrar, submitting, pristine} = this.props;
    return (
            <button type="submit" disabled={submitting || pristine} className="btn btn-primary">{labelCadastrar ? labelCadastrar : 'Cadastrar'}</button>
        );
    }
}
