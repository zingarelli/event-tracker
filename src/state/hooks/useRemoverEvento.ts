import { useSetRecoilState } from "recoil"
import { listaDeEventosState } from "../atom"
import { IEvento } from "../../interfaces/IEvento";

export default function useRemoverEvento() {
    const setListaEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);
    return (evento: IEvento) => {
        setListaEventos(listaAntiga => listaAntiga.filter(item => item.id !== evento.id));
    }
}