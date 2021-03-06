import * as React from 'react';
import LancamentoService from './Service'
import Table, { DadosTabela } from '../Table';
import Titulo from '../Titulo';
import { Link } from 'react-router-dom';
import { valorFormatoBrasileiro } from '../InputMoney';
import { Conta } from '../contas/List';

export interface ListLancamentosProps {
}

export interface Lancamento {
    id : number;
    conta_credito: Conta | number;
    conta_debito: Conta | number;
    valor : number;
    historico? : string;
    data : Date;
}

interface State {
    lancamentos : Lancamento[];
    lancamentoSelecionado : Lancamento;
    dadosTabela : DadosTabela[];
}


export function formataData(valor): string{
    let data = new Date(valor);
    let dia = data.getDate() < 10? `0${data.getDate()}`: data.getDate();
    let mes = data.getUTCMonth()+1 < 10? `0${data.getUTCMonth()+1}` : data.getUTCMonth()+1;
    let ano = data.getFullYear();
    // debugger
    return `${dia}/${mes}/${ano}`;
}

export default class ListLancamentos extends React.Component<ListLancamentosProps, State> {
    constructor(props) {
        super(props);
        
        this.state = {
            lancamentos: [],
            lancamentoSelecionado : { id: 0, conta_credito: 0, conta_debito : 0, valor : 0, data: new Date()},
            dadosTabela : []
        }

        this.setLancamentoSelecionado = this.setLancamentoSelecionado.bind(this);
        this.removeLancamento = this.removeLancamento.bind(this);
        this.transformDataToTable = this.transformDataToTable.bind(this);
    }

    componentDidMount(): void{
        LancamentoService.listaLancamentos()
            .then(res => {
                const lancamentos = res.data;
                this.setState({ lancamentos });
                this.transformDataToTable(lancamentos);
            }).catch(erro =>{
                console.log(erro)
            })
    }

    setLancamentoSelecionado(lancamento : Lancamento): void{
        this.setState({lancamentoSelecionado : lancamento === this.state.lancamentoSelecionado ? { id: 0, conta_credito: 0, conta_debito : 0, valor : 0, data: new Date()}  : lancamento });    
    }

    removeLancamento(): void{
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

    transformDataToTable(dados: any): void {
        const json: any = [];
        if(dados){ 
            dados.forEach( function (dado) {
                json.push({ id : dado.id,
                            conta_credito : dado.conta_credito.descricao,
                            conta_debito : dado.conta_debito.descricao,
                            valor : valorFormatoBrasileiro(dado.valor),
                            historico : dado.historico ? dado.historico : "",
                            data : dado.data ? formataData(dado.data) : ""
                })
            })
        }
        this.setState({ dadosTabela : json })
    }

    public render() {
        return (
            <div className="fadeIn">
                <Titulo texto="Lançamentos"/>
                
                {/* Passar Labels Titulos */}
                <Table dados={this.state.dadosTabela} selecionado={this.state.lancamentoSelecionado} setSelecionado={this.setLancamentoSelecionado} />

                <div className="col-4 mt-3">
                    <Link to="/lancamentos/novo"> <button type="button" className="btn btn-primary">Novo</button> </Link>
                    <Link to={`lancamentos/edit/${this.state.lancamentoSelecionado.id}`}> <button type="button" className="btn btn-info ml-1" disabled={!this.state.lancamentoSelecionado}>Alterar</button> </Link>
                    <button type="button" className="btn btn-danger ml-1" disabled={!this.state.lancamentoSelecionado} onClick={this.removeLancamento}>Excluir</button>
                </div>
            </div>
        );
    }
}
