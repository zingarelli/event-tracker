import { useSetRecoilState } from "recoil"
import { filtroEventos } from "../atom"
import { IFiltroEvento } from "../../interfaces/IFiltroEvento";

export default function useAlterarFiltroEventos() {
    const setFiltroEventos = useSetRecoilState<IFiltroEvento>(filtroEventos);
    return (filtro: IFiltroEvento) => {
        setFiltroEventos(filtro);
    }
}