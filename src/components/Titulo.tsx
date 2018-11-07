import * as React from 'react';

export interface TituloProps {
    texto : string
}

export default class Titulo extends React.Component<TituloProps, any> {
  public render() {
    return (
        <div className="col-2 mt-5">
            <h4>{this.props.texto}</h4>
        </div>
    );
  }
}
