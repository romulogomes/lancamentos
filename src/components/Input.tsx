import * as React from 'react';
import { Field } from 'react-final-form-html5-validation'

export interface InputProps {
    label: string;
    name: string;
    tipo: string;
    required?: boolean;
    mensagem_required?: string;
}

export default class InputText extends React.Component<InputProps, any> {
  public render() {
      const { name, tipo, required, mensagem_required} = this.props
    return (
        <div className="form-group">
            <label htmlFor="name">{this.props.label}</label>
            <Field name={name} 
                required={required} 
                valueMissing={mensagem_required ? mensagem_required : "Necessário preencher esse campo"} 
                component="input" type={tipo ? tipo : "text"} 
                className="form-control" 
            />
        </div>
    );
  }
}
