import * as React from 'react';
import { Link } from 'react-router-dom'

export default class BotaoVoltar extends React.Component<any, any> {
  public render() {
    return (
      
        <Link to={this.props.linkVoltar}> <button type="submit" className="btn btn-light ml-2" >Voltar</button> </Link>
      
    );
  }
}
