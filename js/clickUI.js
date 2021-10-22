import { abrirModalEditado, container } from "./modal.js";

import { armazenamento, db } from "./app.js";
export let valorEditavel;


function clicadoUI(e) {
    const dataAcao = e.target.getAttribute("data-acao");

    if (!dataAcao) return

    const elemento = e.target.parentElement.parentElement.parentElement;




    const acoes = {

        editar: function() {
            let h1 = document.querySelector('.sobreposicao h1');
            h1.innerHTML = "Editar Tarefa";

            const id = elemento.getAttribute('data-id');


            armazenamento.forEach(elemento => {

                if (elemento.id === +id) {
                    document.querySelector('.btn-add').classList.add('esconder');
                    document.querySelector('.btn-sav').classList.remove('esconder');
                    abrirModalEditado(elemento);
                    valorEditavel = elemento;

                }

            })


        },
        concluir: function() {

            const id = elemento.getAttribute('data-id');


            if (elemento.classList.contains("remover")) return
            const txtConcluido = ' <span class="tarefa-completa animate__animated animate__fadeInRight">Tarefa completada</span>';
            if (elemento.classList.contains("completo")) {
                elemento.classList.remove("completo");
                elemento.querySelector('.status').querySelector('.tarefa-completa').remove()
                armazenamento.forEach(el => {
                    if (el.id === +id) {
                        el.status = false;

                    }
                });

            } else {

                elemento.classList.add("completo");
                elemento.querySelector('.status').insertAdjacentHTML('afterbegin', txtConcluido);

                armazenamento.forEach(el => {
                    if (el.id === +id) {
                        el.status = true;

                    }
                });
            }
            db.gravarValores(armazenamento)
        },

        deletar: function() {
            const id = elemento.getAttribute('data-id');
            let index;
            if (elemento.classList.contains("completo")) {
                elemento.classList.remove("completo");
                elemento.querySelector('.status').querySelector('.tarefa-completa').remove()
            }

            const txtRemovido = '<span class="tarefa-removida animate__animated animate__fadeInRight">Tarefa deletada</span>';

            elemento.classList.add("remover");
            elemento.querySelector('.status').insertAdjacentHTML('afterbegin', txtRemovido);


            setTimeout(() => {
                elemento.classList.add('animate__animated');
                elemento.classList.add('animate__fadeOutRight');

            }, 1000);
            setTimeout(() => {
                elemento.remove();

            }, 1500);

            armazenamento.forEach(el => {
                if (el.id === +id) {
                    index = armazenamento.indexOf(el);
                    armazenamento.splice(index, 1);
                }
            })


            db.gravarValores(armazenamento);

        }

    }


    if (acoes[dataAcao]) {
        acoes[dataAcao]()
    }

}

export const acao = () => {
    container.addEventListener('click', clicadoUI);
}