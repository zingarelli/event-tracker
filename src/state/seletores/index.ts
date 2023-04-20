import { selector } from "recoil";
import { filtroEventos, listaDeEventosState } from "../atom";

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