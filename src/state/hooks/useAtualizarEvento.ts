import { useSetRecoilState } from "recoil";
import { IEvento } from "../../interfaces/IEvento";
import { listaDeEventosState } from "../atom";

// Encapsulando o Recoil dentro de um hook

// Retorna uma função que recebe um evento como 
// argumento e atualiza a lista de eventos
export default function useAtualizarEvento() {
    const setListaEventos = useSetRecoilState(listaDeEventosState);
    return (evento: IEvento) => {
        // encontramos o índice do evento na lista e depois criamos uma nova 
        // lista, particionada para incluir o evento alterado no lugar
        setListaEventos(listaAnterior => {
            const indice = listaAnterior.findIndex(item => item.id === evento.id)
            return ([
              ...listaAnterior.slice(0, indice), 
              evento,
              ...listaAnterior.slice(indice+1)
            ])
          });
    }
}