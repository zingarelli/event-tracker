import { selector } from "recoil";
import { filtroEventos, listaDeEventosState } from "../atom";
import { IEvento } from "../../interfaces/IEvento";

// retorna a lista de eventos filtrada por data e estado (completo/incompleto)
export const eventosFiltradosState = selector({
    key: 'eventosFiltradosState',
    get: ({ get }) => {
        const filtro = get(filtroEventos);
        const todosEventos = get(listaDeEventosState);

        // aplicando o filtro por data
        const filtroPorData = todosEventos.filter(evento => {
            if (filtro.data) {
                // os 10 primeiros caracteres são a data no formato 'YYYY-MM-DD'
                return (filtro.data.toISOString().slice(0, 10) === evento.inicio.toISOString().slice(0, 10));
            }
            // se não houver filtro por data, retorna tudo
            else return true;
        })

        // filtro por estado
        const filtroPorEstado = filtroPorData.filter(evento => {
            if (filtro.estado) {
                switch (filtro.estado) {
                    case 'completos':
                        return (evento.completo === true);
                    case 'incompletos':
                        return (evento.completo === false);
                    default:
                        return true
                }
            }
            else return true;
        })

        return filtroPorEstado;
    }
})

// seletor para obter dados de modo assíncrono
export const seletorAsync = selector({
    key: 'seletorAsync',
    get: async () => {
        try {
            // obtém os dados da API
            const response = await fetch('http://localhost:8080/eventos');
            const dados: IEvento[] = await response.json();
            // as datas na resposta são string, então é necessário converter para Date
            return dados.map(evento => ({
                ...evento,
                inicio: new Date(evento.inicio),
                fim: new Date(evento.fim),
            }));
        }
        catch (err) {
            console.log(`Error fetching data from API:\n${err}`);
            return [];
        }
    }
})