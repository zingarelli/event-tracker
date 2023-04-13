// função para retornar um id incremental a ser usado na criação de eventos

let id = 0;

export const obterId = () : number => {
    return id++;
}