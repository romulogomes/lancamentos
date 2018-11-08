import * as React from 'react';
import { Field } from 'react-final-form-html5-validation'
import numeral from 'numeral'

numeral.register('locale', 'pt-br', {
    delimiters: {
        thousands: '.',
        decimal: ','
    },
    abbreviations: {
        thousand: 'mil',
        million: 'milhões',
        billion: 'b',
        trillion: 't'
    },
    ordinal: function (number) {
        return 'º';
    },
    currency: {
        symbol: 'R$'
    }
});

export function replaceAll(string, token, newtoken) {
    if(token!=newtoken){
        while(string.indexOf(token) > -1) {
            string = string.replace(token, newtoken);
        }
    }
    return string;
}

export function valorFormatoBrasileiro(valor) {
    valor = Number(valor).toFixed(2);
    valor = valor.toString().replace(/\D/g,"");
    valor = valor.toString().replace(/(\d)(\d{8})$/,"$1.$2");
    valor = valor.toString().replace(/(\d)(\d{5})$/,"$1.$2");
    valor = valor.toString().replace(/(\d)(\d{2})$/,"$1,$2");
    return valor                    
}

export interface InputMoneyProps {
    name: string;
    placeholder?: string;
    label? :string;
    required? : boolean
    mensagem_required?: string;
}

const formatPrice = value => {
    if(value === undefined) 
       return ''
    else{
       numeral.locale('pt-br');
       return numeral(value).format('0,0.00')
    }
}

export default class InputMoney extends React.Component<InputMoneyProps, any> {
  public render() {
    const { name, placeholder, required, mensagem_required} = this.props
    return (
        <div>
            <label htmlFor={this.props.name}>{this.props.label}</label>
            <Field name={this.props.name} 
                   component="input" className="form-control" type="text" 
                   format={formatPrice} 
                   formatOnBlur 
                   placeholder={this.props.placeholder}
                   required={required} 
                   valueMissing={mensagem_required ? mensagem_required : "Necessário preencher esse campo"}  />
        </div>
    );
  }
}
