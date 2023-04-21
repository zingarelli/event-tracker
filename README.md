# Calendar Event Tracker

[Click here to read the English version of this Readme](#credits)

Gerenciador de eventos e tarefas em um Calendário, sendo possível adicionar novos eventos, movê-los pelo calendário, marcá-los como finalizado e filtrá-los por data ou status. Desenvolvido em React/TypeScript e utilizando o Recoil para gerenciar estados. 

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | **Gerenciador de eventos em um Calendário**
| :label: Tecnologias | React, TypeScript, Recoil
| :rocket: URL         | https://event-tracker-silk.vercel.app
| :fire: Curso     | https://cursos.alura.com.br/course/react-gerenciando-estado-recoil

![](https://user-images.githubusercontent.com/19349339/233661510-89deb235-ac65-4d48-aaea-5708b751a1b1.png#vitrinedev)

## Créditos

Este projeto foi desenvolvido no curso [React: gerenciando estado com Recoil](https://cursos.alura.com.br/course/react-gerenciando-estado-recoil) oferecido pela [Alura](https://www.alura.com.br).

Instrutor: **[Vinicios Neves](https://www.linkedin.com/in/vinny-neves/)**.

## Detalhes do projeto

[Veja o projeto online](https://event-tracker-silk.vercel.app).

Nesta aplicação, é possível gerenciar eventos e tarefas e visualizá-los em um calendário. Ela possui um formulário para adicionar novos eventos, incluindo uma descrição e datas/horários para início e término. Os eventos irão aparecer em uma interface de calendário, parecida com a do Google Calendar, e podem ser arrastados para outras datas e horários, que são alterados dinamicamente.

Há um segundo formulário que permite filtrar eventos por data e status (completo, incompleto ou ambos). O resultado aparece em uma lista abaixo dos filtros e é possível remover ou alterar o status do evento para completo/incompleto. Essas mudanças são refletidas na interface do calendário.

Para fazer o gerenciamento dos estados compartilhados pelos componentes, foi utilizada a [biblioteca Recoil](https://recoiljs.org), que traz conceitos como átomos e seletores. Você pode ler mais sobre ela na seção ["O que eu aprendi"](#o-que-eu-aprendi).

O projeto faz uso do JSON Server, para simular comunicação com uma API para obter dados iniciais de eventos. No entanto, novos eventos **não são** salvos. A aplicação irá rodar mesmo sem o servidor, porém, sem nenhum evento inicialmente. Instruções para subir o servidor se encontram na seção ["Instalação e execução"](#json-server).

### Tela mostrando inclusão de novo evento

![gif mostrando a inserção de um evento e interação drag'n drop no calendário](https://user-images.githubusercontent.com/19349339/233660240-bf2dd95a-fb6e-4375-8ded-35744a4a6fde.gif)

### Tela mostrando filtro e gerenciamento de eventos

![gif mostrando a remoção de um evento e filtragem de eventos por dada e status](https://user-images.githubusercontent.com/19349339/233660224-39a2ff7f-c536-4911-ac48-00480c560001.gif)

## O que eu aprendi

O Recoil é outra biblioteca que possibilita o gerenciamento de estados em uma aplicação React. 

Instalação:

    npm i recoil

### Context API vs Recoil

Utilizei a ChatGPT para que fizesse uma comparação entre a Context API e o Recoil. Segue parte da resposta dela: 

A **Context API** é uma ferramenta que permite o compartilhamento de dados entre componentes em uma hierarquia de componentes, sem precisar passar manualmente as propriedades por vários níveis de componentes. A Context API é **incluída no React**, portanto, é fácil de usar e bem documentada. No entanto, em casos de aplicações com **grande volume de dados**, ela pode ter um **desempenho um pouco inferior** se comparada com outras ferramentas de gerenciamento de estados.

O **Recoil** é uma biblioteca de gerenciamento de estados **desenvolvida pelo Facebook**, que visa facilitar o gerenciamento de estados em aplicações React. Ele possui recursos avançados de gerenciamento de estado, como suporte a átomos (unidade fundamental de estado no Recoil), seletores (funções que permitem combinar, transformar e selecionar dados dos átomos) e suporte para "async selectors" (seletores assíncronos). O Recoil pode ser uma ótima opção para **aplicações maiores e complexas**, onde o gerenciamento de estados é mais crítico.

Em resumo, ambas as opções são úteis e podem ser usadas em diferentes cenários. A Context API é uma ótima opção para projetos menores e mais simples, enquanto o Recoil é uma biblioteca mais avançada que pode ser melhor para projetos maiores e complexos.

### Componente `<RecoilRoot />`

Para um componente `A` ter acesso às funcionalidades do Recoil, é necessário que ele **descenda do `<RecoilRoot />`**. Subcomponentes de `A` também terão acesso ao Recoil. 

### Atom

Conceito introduzido pelo Recoil, em que um estado é composto por vários átomos. O átomo então **representa um pedaço de estado** a ser gerenciado pelo Recoil.

#### Criação de um átomo

Uma abordagem é criar no `src` do projeto uma pasta `state` e um arquivo `atom.ts`, em que definimos e exportamos todos os átomos.

Para criar um átomo, utiliza-se a **função `atom()`** e um objeto com **duas propriedades**:

- `key`: chave única que identifica esse átomo. É usado internamente pelo Recoil para gerenciamento dos átomos. Parece ser uma convenção utilizar o nome da variável instanciada como sendo a key;

- `default`: valor inicial para o átomo.

```ts
import { atom } from "recoil";

export const listaDeEventosState = atom<IEvento[]>({
    key: 'listaDeEventosState',
    default: []
});
```

#### Leitura e alteração de átomo

Para **ler o valor** contido em um átomo, pode ser utilizado o hook `useRecoilValue`, passando como parâmetro o átomo desejado. Esse hook possui um **comportamento parecido com o `useState`**, em que, caso haja uma mudança no valor do átomo, o Recoil irá avisar ao componente para se renderizar novamente.

Para fazer **alteração no valor** de um átomo, é utilizado o hook `useSetRecoilState`, passando como parâmetro o átomo desejado. Esse hook **retorna uma função setter** para o átomo informado. Como está sendo feita somente alteração de valor, esse hook **não causa uma nova renderização** do componente. No jargão do Recoil, é dito que o componente não está subscrito ao átomo.

Quando o componente precisa **ler e alterar** o estado em um átomo, é utilizado o hook `useRecoilState`, cujo retorno é semelhante ao `useState`.

### Seletores

Seletores são uma forma de se aproveitar de um átomo para entregar um **estado derivado de um estado original**. Por exemplo, temos um átomo representando o estado de uma lista de eventos. Podemos criar um seletor que irá mostrar essa lista de eventos filtrada por data. **O seletor será atualizado toda vez que o átomo for atualizado**. Componentes podem então obter o valor diretamente do seletor, ao invés do átomo, usando a mesma função `useRecoilValue`.

Para criar um seletor, utiliza-se a função `selector`, que recebe como argumento um objeto com duas propriedades (há outras propriedades opcionais):

- `key`: chave única que identifica esse seletor;

- `get`: uma função que define como será o estado derivado. Essa função possui um objeto como argumento, que contém um método também chamado `get`. Esse método `get` pode ser utilizado para obter o valor de átomos e outros seletores (substitui o `useRecoilValue`).

Uma sugestão é criar os seletores em um arquivo `state/seletores/index.ts` e exportá-los desse arquivo.

```ts
// state/seletores/index.ts
import { selector } from "recoil";

export const eventosFiltradosState = selector({
    key: 'eventosFiltradosState',
    get: ({ get }) => {
        // seu código aqui
    }
})
```

### Debug de estados

O Recoil oferece o que eles chamam de "Dev Tools", que são alguns hooks e métodos para fazer o debug de estados, possibilitando **observar e logar mudanças de estados**. Essa API ainda se encontra em desenvolvimento e pode ser [vista na documentação oficial](https://recoiljs.org/docs/guides/dev-tools).

## Instalação e execução 

O projeto foi criado com o Create React App, utilizando Node.js (versão v16.15.1) e npm (versão 8.11.0). É necessário possuir ambos instalados em sua máquina para rodar a aplicação.

Após clonar/baixar o projeto, abra um terminal, navegue até a pasta do projeto e rode o seguinte comando para instalar todas as dependências necessárias

    npm install

Após isso, você pode rodar a aplicação em modo de desenvolvimento com o seguinte comando:

    npm start

A aplicação irá rodar no endereço **http://localhost:3000**.

### JSON Server

O JSON Server também será instaldo como dependência do projeto e possui um script para que ele suba em watch mode. Para isso, basta digitar no terminal o comando abaixo: 

    npm run server

O endpoint ficará disponível no endereço **http://localhost:8080/eventos**

---

## Credits

This project was developed in a course from [Alura](https://www.alura.com.br) called "React: managing states with Recoil" ([React: gerenciando estado com Recoil](https://cursos.alura.com.br/course/react-gerenciando-estado-recoil), in Portuguese).

Instructor: **[Vinicios Neves](https://www.linkedin.com/in/vinny-neves/)**.

## Project details

[Check the app online](https://event-tracker-silk.vercel.app).

In this app, it's possible to managem events and tasks and view them in a calendar. The app is in Portuguese.

There's a form to add new events, which will be dynamically displayed in a calendar interface, similar to Google Calendar. It's possible to drag and drop these events in the interface, to change their date/time.

There's another form in which is possible to filter events by date and status (complete/incomplete). The result is show in a list and it's possible to remove events or change their state in this list. Such changes are reflected in the calendar interface as well.

This project was developed in React/TypeScript. In order to manage the states shared by components, it was used the [Recoil library](https://recoiljs.org).

The project also uses JSON Server to simulate API responses, in order to get initial data for the events. New events, however, are **not** saved in the database. The app will work even without JSON Server running, but in this case there will be no events initially available. Instructions for running the server can be found in the [Instalation section](#running-json-server).

### Screen showing a new event being added

![gif showing a new event being added and the drag'n drop interaction with the calendar interface](https://user-images.githubusercontent.com/19349339/233660240-bf2dd95a-fb6e-4375-8ded-35744a4a6fde.gif)

### Screen showing how to manage and filter events

![gif showing an event being removed and also how to filter events by date and status](https://user-images.githubusercontent.com/19349339/233660224-39a2ff7f-c536-4911-ac48-00480c560001.gif)

## Installation

This project was bootstrapped with Create React App, using Node.js (version v16.15.1) and npm (version 8.11.0). You need Node.js and npm installed in order to run this project.

After cloning or downloading this project, open a terminal, navigate to the project's folder and run the following command in order to install all necessary dependencies:

    npm install

After that, you can run the app in the development mode with the following command:

    npm start

The app will run at **http://localhost:3000**.

### Running JSON Server

JSON Server will be installed as a dev dependency of this project. There's a script to run it in watch mode. In order to do that, simply open a terminal and type the following command:

    npm run server

The endpoint will be available at **http://localhost:8080/eventos**.