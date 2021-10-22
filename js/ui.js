import { container, fecharModal } from "./modal.js";
import { armazenamento } from "./app.js";

export class UI {
    container = container;
    contador = armazenamento.length;
    titulo = document.querySelector('#texto-titulo');
    descricao = document.querySelector('#texto-descricao');
    aviso = document.querySelector('.aviso');
    emoji = document.querySelector('.emoji');


    criarTarefa() {
        let valor = this.dadosEntrada();

        if (!valor) return this.erro();



        let saida = `
            <div class="caixa" data-id=${valor.id}>

            <div class="cabecalho">

                <div class="titulo">
                    <i class="fas fa-fire ${valor.prioridade}"></i>
                    <h2>${valor.titulo}</h2>
                </div>

                <div class="icones">
                    <i class="fas fa-pencil-alt" data-acao="editar"></i>
                    <i class="fas fa-check" data-acao="concluir"></i>
                    <i class="fas fa-trash-alt" data-acao="deletar"></i>
                </div>

            </div>

            <div class="descricao">
                <p>${valor.descricao}</p>
            </div>

            <div class="status">
                <span class="data">${valor.data}</span>
            </div>

        </div>
            `
        container.insertAdjacentHTML('afterbegin', saida);
        fecharModal();

        this.titulo.value = ""
        this.descricao.value = "";
        document.querySelector('#media').checked = true;




        return valor;
    }

    dadosEntrada(valor, idValor) {

        if (!valor) this.contador++;

        if (!this.titulo.value.trim()) return false

        let data = new Date();


        let prioridade = document.querySelector('input[name=prioridade]:checked');
        let dados = {
            id: idValor || this.contador,
            titulo: this.titulo.value,
            descricao: this.descricao.value,
            prioridade: prioridade.value,
            data: data.toLocaleDateString(),
            status: false

        };

        return dados;
    }

    erro() {
        this.aviso.classList.add('animate__animated');
        this.aviso.classList.add('animate__shakeX');
        this.emoji.innerHTML = "😵";

        setTimeout(() => {
            this.aviso.classList.remove('animate__animated');
            this.aviso.classList.remove('animate__shakeX');
            this.emoji.innerHTML = "😉";
        }, 1000);

    }
    editar(valor) {


        let val;


        const html = container.querySelectorAll('.caixa');

        html.forEach(el => {

            if (Number(el.getAttribute('data-id')) === valor.id) {


                val = this.dadosEntrada(true, +el.getAttribute('data-id'))
                if (!val) return this.erro();

                el.querySelector('.titulo h2').innerHTML = val.titulo;
                el.querySelector('.descricao p').innerHTML = val.descricao;

                el.querySelector('.fa-fire').classList.remove(`${valor.prioridade}`);

                el.querySelector('.fa-fire').classList.add(`${val.prioridade}`);


                el.querySelector('.data').innerHTML = val.data;
            }

        });

        fecharModal();

        this.titulo.value = ""
        this.descricao.value = "";
        document.querySelector('#media').checked = true;

        return val;


    }

    renderizar(val) {

        const array = [];


        for (let index = val.length; index > 0; index--) {
            array.push(val[index - 1])

        }


        let crud = array.map((valor, i, arr) => {


            return ` <div class="caixa  ${valor.status?'completo':''}  " data-id=${valor.id}>

            <div class="cabecalho">

                <div class="titulo">
                    <i class="fas fa-fire ${valor.prioridade}"></i>
                    <h2>${valor.titulo}</h2>
                </div>

                <div class="icones">
                    <i class="fas fa-pencil-alt" data-acao="editar"></i>
                    <i class="fas fa-check" data-acao="concluir"></i>
                    <i class="fas fa-trash-alt" data-acao="deletar"></i>
                </div>

            </div>

            <div class="descricao">
                <p>${valor.descricao}</p>
            </div>

            <div class="status">
            ${valor.status?'<span class="tarefa-completa animate__animated animate__fadeInRight">Tarefa completada</span>':''} 
                <span class="data">${valor.data}</span>
            </div>

        </div>
            `
        }).join('');

        container.insertAdjacentHTML('afterbegin', crud);


    }


}