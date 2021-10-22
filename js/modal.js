const modal = document.querySelector('.sobreposicao');
export const container = document.querySelector('section');
const btnModal = document.querySelector('.add');
const btnCan = document.querySelector('.btn-can');
const titulo = document.querySelector('#texto-titulo');
const descricao = document.querySelector('#texto-descricao');




export const fecharModal = () => {
    container.classList.remove('esconder');
    modal.classList.add('esconder');

    titulo.value = ""
    descricao.value = "";
    document.querySelector('#media').checked = true;
    document.querySelector('.btn-add').classList.remove('esconder');
    document.querySelector('.btn-sav').classList.add('esconder');


}

const abrirModal = () => {
    container.classList.add('esconder');
    modal.classList.remove('esconder');
    let h1 = document.querySelector('.sobreposicao h1');
    h1.innerHTML = "Adicionar Tarefa";

}

export const abrirModalEditado = (value) => {
    container.classList.add('esconder');
    modal.classList.remove('esconder');


    titulo.value = value.titulo
    descricao.value = value.descricao;

    document.querySelector(`#${value.prioridade}`).checked = true;



}


export const clickSaida = () => {
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' & !modal.classList.contains('hidden')) {
            fecharModal();
        }
    });


}

export const clickEntrada = () => {
    btnModal.addEventListener('click', abrirModal);

}

export const cancelarModal = () => {
    btnCan.addEventListener('click', function(e) {
        e.preventDefault();
        fecharModal();
    })
}