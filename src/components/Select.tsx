import * as React from 'react';
import { Field } from 'react-final-form'

export interface OptionSelect{
    value: any;
    label: string;
}
export interface SelectProps {
    name: string;
    label: string;
    options : OptionSelect[]
}

export default class Select extends React.Component<SelectProps, any> {
  public render() {
    const { name, label, options } = this.props;
        return (
            <div className="form-group">
                <label htmlFor={name}>{label}</label>
                <Field name={name} className="form-control" component="select">
                    <option />
                    { options.map(opcao => <option key={opcao.value} value={opcao.value}>{opcao.label}</option>)}
                </Field>
            </div>
        );
  }
}
