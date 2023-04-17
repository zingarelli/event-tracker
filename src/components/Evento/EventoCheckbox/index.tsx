import React from 'react';
import { IEvento } from '../../../interfaces/IEvento';
import useAtualizarEvento from '../../../state/hooks/useAtualizarEvento';

const EventoCheckbox: React.FC<{ evento: IEvento }> = ({ evento }) => {
  const atualizarEvento = useAtualizarEvento();

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

    atualizarEvento(eventoAlterado);
  }

  return (<i className={estilos.join(' ')} onClick={alterarStatus}></i>)
}

export default EventoCheckbox