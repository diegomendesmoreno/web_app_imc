window.onload = function () {
    let botao = document.querySelector("#botao-calculo");
    botao.addEventListener('click', calculoImcAPI);
}

function criacaoRequest() {
    var request = null;

    try {
        request = new XMLHttpRequest();
    } catch (tryMS) {
        try {
            request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (otherMS) {
            try {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (failed) {
                console.log('no way to create XMLHttpRequest object')
            }
        }
    }

    return request;
}

function calculoImcAPI() {
    let form = document.querySelector("#dados-usuario");
    let peso = form.peso.value;
    let altura = form.altura.value;

    var request = criacaoRequest();
    if (!request) return null;

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status === 200) {
                let apiResponse = JSON.parse(this.responseText);

                console.log("Peso    : " + peso + " kg");
                console.log("Altura  : " + altura + " m");
                console.log("IMC     : " + apiResponse.imc);
                console.log("Classif.: " + apiResponse.imcDescription);

                escreveResultado(parseFloat(apiResponse.imc).toFixed(1), apiResponse.imcDescription);
            }
        }
    };
    request.open('POST', 'http://localhost:8080/imc/calculate', true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({
        'height': altura,
        'weight': peso
    }));
}

function escreveResultado(imc, classificacao) {
    let containerResultado = document.querySelector(".resultado");

    if (containerResultado === null) {
        containerResultado = document.createElement("div");
        containerResultado.classList.add("resultado");

        let resultadoIMC = document.createElement("p");
        resultadoIMC.setAttribute("id", "resultado-imc-numero");
        resultadoIMC.textContent = "O IMC é " + imc;
        containerResultado.appendChild(resultadoIMC);

        let resultadoClassificacao = document.createElement("p");
        resultadoClassificacao.setAttribute("id", "resultado-imc-classificacao");
        resultadoClassificacao.textContent = "Classificação: " + classificacao;
        containerResultado.appendChild(resultadoClassificacao);

        document.body.appendChild(containerResultado);
    }
    else {
        let resultadoIMC = document.querySelector("#resultado-imc-numero");
        resultadoIMC.textContent = "O IMC é " + imc;

        let resultadoClassificacao = document.querySelector("#resultado-imc-classificacao");
        resultadoClassificacao.textContent = "Classificação: " + classificacao;
    }
}

function classificaIMC(imc) {
    if (imc < 18.5) {
        return "Magreza";
    }
    else if (imc >= 18.5 && imc < 25) {
        return "Normal";
    }
    else if (imc >= 25 && imc < 30) {
        return "Sobrepeso";
    }
    else if (imc >= 30) {
        return "Obesidade";
    }
}
