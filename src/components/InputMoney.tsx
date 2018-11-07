import * as React from 'react';
import { Field } from 'react-final-form'
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

export interface InputMoneyProps {
    name: string;
    placeholder?: string;
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
    return (
        <div>
            <Field name={this.props.name} component="input" className="form-control" type="text" format={formatPrice} formatOnBlur placeholder={this.props.placeholder} />
        </div>
    );
  }
}
