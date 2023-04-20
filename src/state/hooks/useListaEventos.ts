import { useRecoilValue } from "recoil";
import { eventosFiltradosState } from "../seletores";

export default function useListaEventos() {
    return useRecoilValue(eventosFiltradosState);
}