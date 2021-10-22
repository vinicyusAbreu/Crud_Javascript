export class DB {
    gravarValores(valor) {
        localStorage.setItem("crud", JSON.stringify(valor))
    }
    pegarValores() {
        return JSON.parse(localStorage.getItem('crud'));
    }

}