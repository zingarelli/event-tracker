import { atom } from "recoil";
import { IEvento } from "../interfaces/IEvento"
import { IFiltroEvento } from "../interfaces/IFiltroEvento";

export const listaDeEventosState = atom<IEvento[]>({
    key: 'listaDeEventosState',
    default: [
        {
            "descricao": "Estudar React",
            "inicio": new Date("2023-04-17T09:00"),
            "fim": new Date("2023-04-17T13:00"),
            "completo": false,
            "id": 1642342747
        },
        {
            "descricao": "Estudar Recoil",
            "inicio": new Date("2023-04-18T09:00"),
            "fim": new Date("2023-04-18T11:00"),
            "completo": false,
            "id": 1642342959
        }
    ]
});

export const filtroEventos = atom<IFiltroEvento>({
    key: 'filtroEventos',
    default: {}
})