import * as React from 'react';
import { Field } from 'react-final-form-html5-validation'

export interface OptionSelect{
    value: any;
    label: string;
}
export interface SelectProps {
    name: string;
    label: string;
    options : OptionSelect[]
    required? : boolean
    mensagem_required?: string;
}

export default class Select extends React.Component<SelectProps, any> {
  public render() {
    const { name, label, options, mensagem_required, required  } = this.props;
        return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <Field name={name} className="form-control" 
                       component="select" 
                       required={required} 
                       valueMissing={mensagem_required ? mensagem_required : "Necessário preencher esse campo"} >
                    <option />
                    { options.map(opcao => <option key={opcao.value} value={opcao.value}>{opcao.label}</option>)}
                </Field>
            </div>
        );
  }
}
