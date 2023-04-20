import { atom } from "recoil";
import { IEvento } from "../interfaces/IEvento"
import { IFiltroEvento } from "../interfaces/IFiltroEvento";
import { seletorAsync } from "./seletores";

export const listaDeEventosState = atom<IEvento[]>({
    key: 'listaDeEventosState',
    default: seletorAsync
});

export const filtroEventos = atom<IFiltroEvento>({
    key: 'filtroEventos',
    default: {}
})