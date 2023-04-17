import { useSetRecoilState } from "recoil";
import { listaDeEventosState } from "../atom";
import { IEvento } from "../../interfaces/IEvento";
import { obterId } from "../../util";

export default function useAdicionarEvento() {
    const setListaEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);
    return (evento: IEvento) => {
        evento.id = obterId();
        const hoje = new Date();
        if(evento.inicio < hoje) {
            throw new Error('A data do evento não pode ser anterior ao dia atual');
        }
        if(evento.inicio > evento.fim) {
            throw new Error('A data de início não pode ser posterior à data do final do evento');
        }
        setListaEventos(listaAnterior => [...listaAnterior, evento]);
    }
}