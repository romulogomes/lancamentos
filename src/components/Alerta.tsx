import * as React from 'react';

export interface AlertaProps {
    show : boolean;
    tipo : string;
    mensagem? : string;
    clickFechar() : void 
}


export default class Alerta extends React.Component<AlertaProps, any> {
  public render() {
    return (
        <div>
            { this.props.show  && this.props.tipo === "sucesso" &&
                <div className="alert alert-success mt-4 fadeIn" role="alert">
                    { this.props.mensagem ? this.props.mensagem : "Salvo com Sucesso"}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.clickFechar}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div> }

            { this.props.show  && this.props.tipo === "alerta" && 
                <div className="alert alert-warning alert-dismissible fade show mt-4 fadeIn" role="alert">
                    <strong>Atenção!</strong> { this.props.mensagem ? this.props.mensagem : ""}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.props.clickFechar} >
                        <span aria-hidden="true">&times;</span>
                    </button>
            </div> }
        </div>
    );
  }
}
