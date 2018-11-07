import * as React from 'react';
import { Link } from "react-router-dom";

export interface HeaderProps {
}

export default class Header extends React.Component<HeaderProps, any> {
  public render() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light header">
            <a className="navbar-brand color_white" href="#">TCC</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active ">
                            <Link to="/aluno" className="nav-link color_white">Alunos</Link>
                        </li>
                    
                        <li className="nav-item ">
                            <Link to="/orientador" className="nav-link color_white">Orientadores</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
  }
}
