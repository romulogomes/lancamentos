import * as React from 'react';
import LancamentoService from './Service'
import Table, { DadosTabela } from '../Table';
import Titulo from '../Titulo';
import { Link } from 'react-router-dom';

export interface ListLancamentosProps {
}

export interface Conta {
    id: number;
    descricao: string;
    natureza: string;
    codigo: string;
}

export interface Lancamento {
    id : number;
    conta_credito: Conta | number;
    conta_debito: Conta | number;
    valor : number;
    historico? : string;

}

export interface State {
    lancamentos : Lancamento[];
    lancamentoSelecionado : Lancamento;
    dadosTabela : DadosTabela[];
}

export default class ListLancamentos extends React.Component<ListLancamentosProps, State> {
    constructor(props) {
        super(props);
        
        this.state = {
            lancamentos: [],
            lancamentoSelecionado : { id: 0, conta_credito: 0, conta_debito : 0, valor : 0},
            dadosTabela : []
        }

        this.setLancamentoSelecionado = this.setLancamentoSelecionado.bind(this);
        this.redirectEditLancamento = this.redirectEditLancamento.bind(this);
        this.removeLancamento = this.removeLancamento.bind(this);
        this.transformDataToTable = this.transformDataToTable.bind(this);
    }

    componentDidMount(){
        LancamentoService.listaLancamentos()
            .then(res => {
                
                const lancamentos = res.data;
                this.setState({ lancamentos });
                this.transformDataToTable(lancamentos);
            }).catch(erro =>{
                console.log(erro)
            })
    }

    setLancamentoSelecionado(lancamento : Lancamento) : void{
        this.setState({lancamentoSelecionado : lancamento === this.state.lancamentoSelecionado ? { id: 0, conta_credito: 0, conta_debito : 0, valor : 0}  : lancamento });    
    }

    removeLancamento() : void{
        if (window.confirm("Confirma deletar Lançamento?")) {
            LancamentoService.removeLancamento(this.state.lancamentoSelecionado.id) 
              .then(res => {
                alert("Lançamento Removido com sucesso");
                this.componentDidMount();
            }).catch(erro =>{
                console.log(erro)
            })
        }
    }

    redirectEditLancamento() : void{
        window.location.href = `lancamentos/edit/${this.state.lancamentoSelecionado.id}`;
    }

    transformDataToTable( dados : any ) : void {
        const json : any = [];
        if(dados){ 
            dados.forEach( function (dado) {
                json.push({ id : dado.id,
                            conta_credito : dado.conta_credito.descricao,
                            conta_debito : dado.conta_debito.descricao,
                            valor : dado.valor,
                            historico : dado.historico ? dado.historico : ""
                })
            })
        }
        this.setState({ dadosTabela : json })
    }

    public render() {
        return (
            <div className="fadeIn">
                <Titulo texto="Lançamentos"/>

                <Table dados={this.state.dadosTabela} selecionado={this.state.lancamentoSelecionado} setSelecionado={this.setLancamentoSelecionado} />

                <div className="col-4 mt-3">
                    <Link to="/aluno/novo"> <button type="button" className="btn btn-primary">Novo</button> </Link>
                    <button type="button" className="btn btn-info ml-1" disabled={!this.state.lancamentoSelecionado} onClick={this.redirectEditLancamento}>Alterar</button>
                    <button type="button" className="btn btn-danger ml-1" disabled={!this.state.lancamentoSelecionado} onClick={this.removeLancamento}>Excluir</button>
                </div>
            </div>
        );
    }
}
