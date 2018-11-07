import axios, { AxiosPromise } from 'axios';
import { API_URL } from '../../ApiUrl'

class ContaService {

    url_contas = API_URL+'contas/';

    listaContas() : AxiosPromise{
        return axios.get(this.url_contas);
    }
    
    // getInfosAluno(idAluno : number): AxiosPromise{
    //     return axios.get(this.url_contas + idAluno);
    // }
    
    // gravaLancamento(data: any): AxiosPromise{
    //     return axios.post( this.url_contas, data);
    // }
    
    // editarLancamento(data : any): AxiosPromise{
    //     return axios.put(this.url_contas, data);
    // }
    
    // removeLancamento(idLancamento : number): AxiosPromise{
    //     return axios.delete(this.url_contas+idLancamento);
    // }
}

export default new ContaService();

