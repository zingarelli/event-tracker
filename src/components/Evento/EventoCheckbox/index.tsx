import React from 'react';
import { IEvento } from '../../../interfaces/IEvento';
import { listaDeEventosState } from '../../../state/atom';
import { useSetRecoilState } from 'recoil';

const EventoCheckbox: React.FC<{ evento: IEvento }> = ({ evento }) => {
  const setListaDeEventos = useSetRecoilState<IEvento[]>(listaDeEventosState);

  const estilos = [
    'far',
    'fa-2x',
    evento.completo ? 'fa-check-square' : 'fa-square'
  ]

  const alterarStatus = () => {
    // o código abaixo não é possível, pois as props são somente leitura
    // evento.completo = !evento.completo;

    // temos então que copiar a prop e depois alterar a cópia
    const eventoAlterado = { ...evento };
    eventoAlterado.completo = !evento.completo;

    // encontramos o índice do evento na lista e depois criamos uma nova 
    // lista, particionada para incluir o evento alterado no lugar
    setListaDeEventos(listaAnterior => {
      const indice =  listaAnterior.findIndex(item => item.id === evento.id);
      return [
        ...listaAnterior.slice(0, indice),
        eventoAlterado, 
        ...listaAnterior.slice(indice+1)
      ]
    });
  }

  return (<i className={estilos.join(' ')} onClick={alterarStatus}></i>)
}

export default EventoCheckbox