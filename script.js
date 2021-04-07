window.onload = function() {
    let botao = document.querySelector("#botao-calculo");
    botao.addEventListener('click', calculoIMC);
}

function calculoIMC() {
    let form = document.querySelector("#dados-usuario");
    let peso = form.peso.value;
    let altura = form.altura.value;
    let imcNumero = peso / (altura * altura);
    let imcClassificacao = classificaIMC(imcNumero);

    console.log("Peso: "+peso+" kg");
    console.log("Altura: "+altura+" m");
    console.log("IMC: "+imcNumero);

    escreveResultado(imcNumero.toFixed(1), imcClassificacao);
}

function escreveResultado(imc, classificacao) {
    let containerResultado = document.querySelector(".resultado");

    if(containerResultado === null) {
        containerResultado = document.createElement("div");
        containerResultado.classList.add("resultado");

        let resultadoIMC = document.createElement("p");
        resultadoIMC.setAttribute("id", "resultado-imc-numero");
        resultadoIMC.textContent = "O IMC é "+imc;
        containerResultado.appendChild(resultadoIMC);

        let resultadoClassificacao = document.createElement("p");
        resultadoClassificacao.setAttribute("id", "resultado-imc-classificacao");
        resultadoClassificacao.textContent = "Classificação: "+classificacao;
        containerResultado.appendChild(resultadoClassificacao);

        document.body.appendChild(containerResultado);
    }
    else {
        let resultadoIMC = document.querySelector("#resultado-imc-numero");
        resultadoIMC.textContent = "O IMC é "+imc;

        let resultadoClassificacao = document.querySelector("#resultado-imc-classificacao");
        resultadoClassificacao.textContent = "Classificação: "+classificacao;
    }
}

function classificaIMC(imc) {
    if(imc < 18.5) {
        return "Magreza";
    }
    else if(imc >= 18.5 && imc < 25) {
        return "Normal";
    }
    else if(imc >= 25 && imc < 30) {
        return "Sobrepeso";
    }
    else if(imc >= 30) {
        return "Obesidade";
    }
}
