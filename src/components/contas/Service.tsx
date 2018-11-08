import axios, { AxiosPromise } from 'axios';
import { API_URL } from '../../ApiUrl'

class ContaService {

    url_contas = API_URL+'contas/';

    listaContas() : AxiosPromise{
        return axios.get(this.url_contas);
    }
    
    getInfosConta(idConta : number): AxiosPromise{
        return axios.get(this.url_contas + idConta);
    }
    
    gravaConta(data: any): AxiosPromise{
        return axios.post( this.url_contas, data);
    }
    
    editarConta(data : any): AxiosPromise{
        return axios.put(this.url_contas, data);
    }
    
    removeConta(idConta : number): AxiosPromise{
        return axios.delete(this.url_contas+idConta);
    }
}

export default new ContaService();

