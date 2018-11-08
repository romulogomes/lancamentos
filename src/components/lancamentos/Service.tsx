import axios, { AxiosPromise } from 'axios';
import { API_URL } from '../../ApiUrl'
import { Lancamento } from './List';

class LancamentoService {

    url_lancamentos = API_URL+'lancamentos/';

    listaLancamentos() : AxiosPromise<Lancamento[]>{
        return axios.get(this.url_lancamentos);
    }
    
    getInfosLancamento(idLancamento : number): AxiosPromise<Lancamento>{
        return axios.get(this.url_lancamentos + idLancamento);
    }
    
    gravaLancamento(data: any): AxiosPromise<Lancamento[]>{
        return axios.post( this.url_lancamentos, data);
    }
    
    editarLancamento(data : any): AxiosPromise<Lancamento>{
        return axios.put(this.url_lancamentos, data);
    }
    
    removeLancamento(idLancamento : number): AxiosPromise{
        return axios.delete(this.url_lancamentos+idLancamento);
    }
}

export default new LancamentoService();

