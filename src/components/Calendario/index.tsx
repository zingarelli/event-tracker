
import React from 'react'
import style from './Calendario.module.scss';
import ptBR from './localizacao/ptBR.json'
import Kalend, { CalendarEvent, CalendarView, OnEventDragFinish } from 'kalend'
import 'kalend/dist/styles/index.css';
import { IEvento } from '../../interfaces/IEvento';
import useAtualizarEvento from '../../state/hooks/useAtualizarEvento';
import useListaEventos from '../../state/hooks/useListaEventos';

// startAt e endA são baseados em um Date com data e hora (ex. "2023-04-13T09:00")
interface IKalendEvento {
  id?: number
  startAt: string
  endAt: string
  summary: string
  completed: boolean
  color: string
}

const Calendario: React.FC = () => {

  const eventosKalend = new Map<string, IKalendEvento[]>();

  const eventos = useListaEventos()
  const atualizarEvento = useAtualizarEvento();

  eventos.forEach(evento => {
    const chave = evento.inicio.toISOString().slice(0, 10)
    if (!eventosKalend.has(chave)) {
      eventosKalend.set(chave, [])
    }
    eventosKalend.get(chave)?.push({
      id: evento.id,
      startAt: evento.inicio.toISOString(),
      endAt: evento.fim.toISOString(),
      summary: evento.descricao,
      completed: evento.completo,
      color: 'blue'
    })
  })

  // atualiza data e hora quando um evento é arrastado no calendário
  const onEventDragFinish: OnEventDragFinish = (
    prevEvent: CalendarEvent,
    updatedEvent: CalendarEvent
  ) => {
    // este find não está funcionando quando novos eventos são adicionados
    // listaEventos por algum motivo não é atualizada dentro dessa função
    // const evento = listaEventos.find(item => item.id === updatedEvent.id)
    const eventoAlterado : IEvento = {
      id: updatedEvent.id,
      inicio: new Date(updatedEvent.startAt),
      fim: new Date(updatedEvent.endAt),
      descricao: updatedEvent.summary,
      completo: updatedEvent.completed
    }
    atualizarEvento(eventoAlterado);    
  };

  return (
    <div className={style.Container}>
      <Kalend
        events={Object.fromEntries(eventosKalend)}
        initialDate={new Date().toISOString()}
        hourHeight={60}
        initialView={CalendarView.WEEK}
        timeFormat={'24'}
        weekDayStart={'Monday'}
        calendarIDsHidden={['work']}
        language={'customLanguage'}
        customLanguage={ptBR}
        onEventDragFinish={onEventDragFinish}
      />
    </div>
  );
}

export default Calendario