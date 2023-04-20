import React, { useState } from 'react';
import style from './Filtro.module.scss';
import useAlterarFiltroEventos from '../../state/hooks/useAlterarFiltroEventos';
import { IFiltroEvento } from '../../interfaces/IFiltroEvento';

const Filtro: React.FC = () => {

  const [data, setData] = useState('');
  const [estado, setEstado] = useState('ambos');
  const setFiltro = useAlterarFiltroEventos();

  const submeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const filtro: IFiltroEvento = {}

    if (data) {
      filtro.data = new Date(data);
    } else {
      filtro.data = null;
    }

    if (estado) {
      filtro.estado = estado
    } else {
      filtro.estado = null;
    }

    setFiltro(filtro);
  }

  return (<form className={style.Filtro} onSubmit={submeterForm}>
    <h3 className={style.titulo}>Filtrar por:</h3>
    <label htmlFor="data">Data</label>
    <input
      type="date"
      name="data"
      id="data"
      className={style.input}
      onChange={evento => setData(evento.target.value)}
      placeholder="Por data"
      value={data} />

    <label htmlFor="estado">Estado</label>
    <select
      name="estado" 
      id="estado"
      className={style.select}
      value={estado}
      onChange={evento => setEstado(evento.target.value)}
    >
      <option value="ambos">Ambos</option>
      <option value="completos">Completos</option>
      <option value="incompletos">Incompletos</option>
    </select>

    <button className={style.botao}>
      Filtrar
    </button>
  </form>)
}

export default Filtro