import { useRecoilValue } from "recoil";
import { listaDeEventosState } from "../atom";

export default function useListaEventos() {
    return useRecoilValue(listaDeEventosState);
}