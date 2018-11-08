import * as React from 'react';
import { Form } from 'react-final-form'
import Alerta from '../Alerta';
import InputText from '../Input';
import Select, { OptionSelect } from '../Select';
import BotoesCrud from '../BotoesCrud';
import ContaService from './Service'

export interface FormContasProps {
}

interface State{
  idConta : number;
  descricao : string;
  natureza: string;
  codigo: string;
  classificacao: string;
}

export default class FormContas extends React.Component<FormContasProps, any> {
  constructor(props) {
    super(props);
    
    this.state = {
        idConta : props.match.params.id ? props.match.params.id : 0,
        descricao : '',
        natureza : '', 
        codigo: '',
        classificacao : '',
        sucesso : { ativo : false, mensagem : ''},
        alerta : { ativo : false, mensagem : ''},
    }  
  }
  
    dismissAlert(alert: string): void{
      if(alert === 'alerta')
          this.setState({ alerta : { ativo : false } })
      else
          this.setState({ sucesso:  { ativo : false } })
    }

    salvarConta(dados : any): void{  
      debugger      
      if(this.state.idLancamento){
          dados.id = this.state.idLancamento;
          ContaService.editarConta(dados)
              .then(res => {
                  this.setState( {sucesso : { ativo : true, mensagem : "Editado com Sucesso"}, alerta : { ativo : false} });
              }).catch(erro => { console.log(erro); })    
      }
      else{        
        ContaService.gravaConta(dados)
              .then(res => {
                  this.setState( {sucesso : { ativo : true, mensagem : "Lançamento cadastrado com Sucesso"} , alerta : { ativo : false} });
              }).catch(erro => { console.log(erro); })
      }
    }

    

    public render() {
      const optionsNatureza = [{value : "D", label: "Devedora" }, {value : "C", label: "Credora" }];
      const optionsClassificacao = [{value : "Ativo", label: "Ativo" }, {value : "Passivo", label: "Passivo" }]

      return (
        <div className="fadeIn mt-4 p-4">
            <Alerta tipo="sucesso" show={this.state.sucesso.ativo} mensagem={this.state.sucesso.mensagem} clickFechar={() => this.dismissAlert('sucesso')} />
            <Alerta tipo="alerta" show={this.state.alerta.ativo} mensagem={this.state.alerta.mensagem} clickFechar={() => this.dismissAlert('alerta')} />

            <Form onSubmit={this.salvarConta}
                    // initialValues={{ historico: this.state.historico}}
                    render={({ handleSubmit, form, submitting, pristine}) => (
                        <form onSubmit={handleSubmit}>

                            <div className="row">
                                <div className="col-7">
                                    <InputText label="Descrição" name="descricao" tipo="text" />      
                                </div>
                                <div className="col-5">
                                    <Select label="Natureza" name="natureza" options={optionsNatureza} />
                                </div>
                            </div>
                            
                            
                            <div className="row">
                                <div className="col-6 pl-3">
                                  <Select label="Classificação" name="classificacao" options={optionsClassificacao} />
                                </div>
                                <div className="col-6 pl-3">
                                  <InputText label="Codigo" name="codigo" tipo="text" />
                                </div>
                            </div>
                          <hr></hr>
                            <BotoesCrud labelCadastrar="Salvar" linkVoltar="/contas" submitting={submitting} pristine={pristine}/>
                        </form>
                    )}
                />

        </div>
      );
    }
}
