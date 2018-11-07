import * as React from 'react';
import { Form } from 'react-final-form'
import Alerta from '../Alerta';
import InputMoney, { replaceAll, valorFormatoBrasileiro } from '../InputMoney';
import BotoesCrud from '../BotoesCrud';
import InputText from '../Input';
import LancamentoService from './Service'
import ContaService from './../contas/Service'
import Select from '../Select';
import { Lancamento, Conta } from './List';

export interface FormLancamentosProps {
}

export default class FormLancamentos extends React.Component<FormLancamentosProps, any> {
    constructor(props) {
        super(props);
        
        this.state = {
            idLancamento : props.match.params.id ? props.match.params.id : 0,
            historico : '',
            conta_credito : {}, 
            conta_debito: {},
            valor : 0,
            sucesso : { ativo : false, mensagem : ''},
            alerta : { ativo : false, mensagem : ''},
            options : [],
        }

        this.salvarLancamento = this.salvarLancamento.bind(this);
        // this.selecionaOrientador = this.selecionaOrientador.bind(this);
        this.dismissAlert = this.dismissAlert.bind(this);
        // this.addConta = this.addConta.bind(this);
    }

    componentDidMount(): void{
        ContaService.listaContas()
            .then(res => {
                const contas = res.data;
                this.setState({ contas });
                this.transformOptions(contas);
            }).catch(erro =>{ console.log(erro) })

        if(this.state.idLancamento)
          this.getInfosLancamento();
    }

    getInfosLancamento(): void{
        LancamentoService.getInfosLancamento(this.state.idLancamento)
            .then(res => {
                console.log(res.data);
                const Lancamento = res.data;
                this.setState({ historico : Lancamento.historico, valor: Lancamento.valor, 
                                conta_credito : Lancamento.conta_credito.id, 
                                conta_debito : Lancamento.conta_debito.id,
                             });
            }).catch(erro => { console.log(erro)})
    }

    dismissAlert(alert: string): void{
        if(alert === 'alerta')
            this.setState({ alerta : { ativo : false } })
        else
            this.setState({ sucesso:  { ativo : false } })
    }

    transformOptions(contas : Conta[]) : void{
        const options = contas.map(conta => ({ value: conta.id, label: conta.codigo +" - "+conta.descricao }))
        this.setState({options});   
    }

    formatarValores( valor ){
        if(valor){
            if(valor.toString().indexOf(",") != -1 && valor[valor.lenght-3] !== ",") {
                valor = replaceAll(valor, ".", "");
                valor = valor.replace(",", ".");
            }
        }   
        return parseFloat(valor);
    }

    

    salvarLancamento(dados : any) : void{        
        const jsonSend : any = { conta_credito : dados.conta_credito, conta_debito : dados.conta_debito, valor: this.formatarValores(dados.valor), historico: dados.historico };

        if(this.state.idLancamento){
            jsonSend.id = this.state.idLancamento;
            LancamentoService.editarLancamento(jsonSend)
                .then(res => {
                    this.setState( {sucesso : { ativo : true, mensagem : "Editado com Sucesso"}, alerta : { ativo : false} });
                }).catch(erro => { console.log(erro); })    
        }
        else{        
            LancamentoService.gravaLancamento(jsonSend)
                .then(res => {
                    this.setState( {sucesso : { ativo : true, mensagem : "Lançamento cadastrado com Sucesso"} , alerta : { ativo : false} });
                }).catch(erro => { console.log(erro); })
        }
    }


    public render() {
        return (
            <div className="mt-4 p-4">
                <Form onSubmit={this.salvarLancamento}
                    initialValues={{ historico: this.state.historico, valor : valorFormatoBrasileiro(this.state.valor), conta_credito: this.state.conta_credito, conta_debito: this.state.conta_debito }}
                    render={({ handleSubmit, form, submitting, pristine}) => (
                        <form onSubmit={handleSubmit}>
                                                       
                            {/* { this.state.contas.map((item, index) => 
                                <div key={index} className="fadeIn">
                                    <Select label="Orientador" name={`contas[${index}].advisor`} options={this.state.options} />
                                    <InputMoney name={`contas[${index}].valor`} placeholder="0,00" />
                                </div>
                                )
                            } */}

                            {/* <button type="button" className="btn btn-primary" onClick={this.addConta}> Add conta </button> */}

                            <Select label="Crédito" name="conta_credito" options={this.state.options} />

                            <Select label="Débito" name="conta_debito" options={this.state.options} />
                            
                            <InputMoney label="Valor" name="valor" placeholder="0,00" />

                            <InputText label="Historico" name="historico" tipo="text" />

                            <BotoesCrud labelCadastrar="Salvar" linkVoltar="/lancamentos" submitting={submitting} pristine={pristine}/>
                        </form>
                    )}
                />
                
                <Alerta tipo="sucesso" show={this.state.sucesso.ativo} mensagem={this.state.sucesso.mensagem} clickFechar={() => this.dismissAlert('sucesso')} />
                <Alerta tipo="alerta" show={this.state.alerta.ativo} mensagem={this.state.alerta.mensagem} clickFechar={() => this.dismissAlert('alerta')} />
            </div>
        );
    }
}
