import * as React from 'react';
import ContaService from './Service'
import Titulo from '../Titulo';
import Table from '../Table';
import { Link } from 'react-router-dom';

export interface ListContasProps {
}

export interface Conta {
    id: number;
    descricao: string;
    natureza: string;
    codigo: string;
    classificacao: string;
}

interface State {
    contas: Conta[];
    contaSelecionada: Conta;
}

export default class ListContas extends React.Component<ListContasProps, State> {
    constructor(props){
        super(props);
    
        this.state = {
          contas : [],
          contaSelecionada : { id : 0, descricao: "", natureza: "", classificacao: "", codigo: "" },
        }
        
        this.setContaSelecionada = this.setContaSelecionada.bind(this);
        this.removeConta = this.removeConta.bind(this);
      }

    componentDidMount(): void{
        ContaService.listaContas()
            .then(res => {
                const contas = res.data;
                console.log(contas);
                contas.map(conta => conta.natureza === "D" ? conta.natureza = "Devedora" : conta.natureza = "Credora")
                this.setState({ contas });
            }).catch(erro =>{
                console.log(erro)
            })
    }

    setContaSelecionada(conta : Conta) : void{
        this.setState({contaSelecionada : conta === this.state.contaSelecionada ? { id : 0, descricao: "", natureza: "", classificacao: "", codigo: "" } : conta });    
    }

    removeConta() : void{
        if (window.confirm("Confirma deletar a Conta?")) {
            ContaService.removeConta(this.state.contaSelecionada.id) 
              .then(res => {
                alert("Conta Removida com sucesso");
                this.componentDidMount();
            }).catch(erro =>{
                if(erro.response.status === 400)
                    alert(erro.response.data.message);
                console.log(erro)
            })
        }
    }
 
    public render() {
        return (
            <div className="fadeIn">
                <Titulo texto="Contas"/>

                <Table dados={this.state.contas} selecionado={this.state.contaSelecionada} setSelecionado={this.setContaSelecionada} />
                
                <div className="col-4 mt-3">
                    <Link to="/contas/novo"> <button type="button" className="btn btn-primary">Novo</button> </Link>
                    <Link to={`contas/edit/${this.state.contaSelecionada.id}`}> <button type="button" className="btn btn-info ml-1" disabled={!this.state.contaSelecionada}>Alterar</button> </Link>
                    <button type="button" className="btn btn-danger ml-1" disabled={!this.state.contaSelecionada} onClick={this.removeConta}>Excluir</button>
                </div>
            </div>
        );
    }
}
