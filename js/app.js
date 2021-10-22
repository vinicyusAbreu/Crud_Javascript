import { clickEntrada, clickSaida, cancelarModal } from "./modal.js";
import { UI } from "./ui.js";
import { acao, valorEditavel } from "./clickUI.js";
import { DB } from "./db.js";



export const db = new DB();
export const armazenamento = db.pegarValores() || [];
const ui = new UI();

const adicionar = document.querySelector('.btn-add');
const salvar = document.querySelector('.btn-sav');
const sucesso = document.querySelector('.sucesso');
export let editadoValor;

clickEntrada();
cancelarModal();
clickSaida();



adicionar.addEventListener('click', function(e) {
    e.preventDefault();
    armazenamento.push(ui.criarTarefa());
    db.gravarValores(armazenamento);

});

salvar.addEventListener('click', function(e) {
    e.preventDefault();

    const retorno = ui.editar(valorEditavel);

    armazenamento.forEach(element => {
        if (element.id === retorno.id) {
            element.titulo = retorno.titulo;
            element.descricao = retorno.descricao;
            element.prioridade = retorno.prioridade;
            element.data = retorno.data;
        }

    });

    db.gravarValores(armazenamento)
    sucesso.classList.remove('esconder');


    setTimeout(() => {
        sucesso.classList.remove('animate__fadeInDown');
        sucesso.classList.add('animate__fadeOutUp');
    }, 1500);

    setTimeout(() => {
        sucesso.classList.add('esconder');
    }, 1800);




});




if (armazenamento) {
    ui.renderizar(armazenamento)
}


acao();