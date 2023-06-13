// Função para redirecionar para a página de login
function fazerLogout() {
    // Limpar qualquer dado de sessão existente
    sessionStorage.clear();
  
    // Redirecionar para a página de login
    window.location.href = "home.html";
  }
  
  // Função para exibir e ocultar o menu suspenso
  function toggleMenu() {
    var menuDropdown = document.querySelector(".menu-dropdown");
    menuDropdown.style.display = (menuDropdown.style.display === "block") ? "none" : "block";
  }
  
  // Evento de clique no ícone do menu
  var menuIcon = document.querySelector(".menu-icon");
  menuIcon.addEventListener("click", toggleMenu);
  
  // Vincular a função fazerLogout ao evento de clique do botão Logout
  document.getElementById("logout").addEventListener("click", fazerLogout);
  
  // Função para obter a data e hora atual das postagens
  function getFormattedDateTime() {
    var now = new Date();
    var date = now.toLocaleDateString();
    var time = now.toLocaleTimeString();
    return date + ' ' + time;
  }
  
  // Função para enviar a mensagem
  function enviarMensagem() {
    // Obter o conteúdo da mensagem
    var mensagem = document.getElementById("mensagem").value;
    // Obter o conteúdo do assunto
    var assuntoMensagem = document.getElementById("assuntoMensagem").value;
  
    // Validar se a mensagem foi fornecida
    if (mensagem === "") {
      alert("Por favor, digite uma mensagem!");
      return;
    }
  
    // Obter o nome do autor da sessão do usuário
    var autor = sessionStorage.getItem("autor");
  
    // Verificar se o autor está definido na sessão
    if (autor === null) {
      alert("Erro: autor não definido!");
      return;
    }
  
    // Criar um objeto de mensagem com data e hora
    var novaMensagem3 = {
      autor: autor,
      assuntoMensagem: assuntoMensagem,
      mensagem: mensagem,
      dataHora: getFormattedDateTime()
    };
  
    // Obter as mensagens existentes ou criar um novo array vazio
    var mensagens3 = [];
  
    // Verificar se já existem mensagens armazenadas no arquivo JSON
    var storedMessages3 = localStorage.getItem("mensagens3");
  
    if (storedMessages3 !== null) {
      mensagens3 = JSON.parse(storedMessages3);
    }
  
    // Adicionar a nova mensagem à lista
    mensagens3.push(novaMensagem3);
  
    // Armazenar as mensagens atualizadas no arquivo JSON
    localStorage.setItem("mensagens3", JSON.stringify(mensagens3));
  
    // Limpar o campo de entrada
    document.getElementById("mensagem").value = "";
    document.getElementById("assuntoMensagem").value = "";
  
    // Atualizar a exibição das mensagens
    exibirMensagens();
  }
  
  // Função para exibir as mensagens
  function exibirMensagens() {
    // Obter as mensagens armazenadas no arquivo JSON
    var storedMessages3 = localStorage.getItem("mensagens3");
  
    if (storedMessages3 !== null) {
      var mensagens3 = JSON.parse(storedMessages3);
  
      // Construir o HTML para exibir as mensagens
      var html = "";
      for (var i = 0; i < mensagens3.length; i++) {
        var mensagem = mensagens3[i];
        html += "<div class='mensagem'><strong>" + mensagem.dataHora + "<br>" + mensagem.assuntoMensagem + "<br>" + mensagem.autor + ":</strong> " + mensagem.mensagem + "</div>";
        html += "<div class='pergunta'><span class='pergunta-texto'>Esse comentário foi útil?</span>";
        html += "<div class='botoes-avaliacao'>";
        html += "<button class='curtir-btn'>👍</button>";
        html += "<button class='nao-curtir-btn'>👎</button>";
        html += "</div></div>";
      }
  
      // Atualizar o elemento de exibição
    var mensagensContainer = document.getElementById("mensagens-container");
    mensagensContainer.innerHTML = html;

    // Adicionar ouvintes de eventos para os botões de curtir e não curtir
    var curtirButtons = document.getElementsByClassName("curtir-btn");
    var naoCurtirButtons = document.getElementsByClassName("nao-curtir-btn");

    for (var i = 0; i < curtirButtons.length; i++) {
      curtirButtons[i].addEventListener("click", function() {
        // Lógica para curtir a mensagem
        var parent = this.parentNode.parentNode;
        var naoCurtirButton = parent.querySelector(".nao-curtir-btn");
        naoCurtirButton.disabled = true;
        naoCurtirButton.classList.add("disabled");
      });
    }

    for (var i = 0; i < naoCurtirButtons.length; i++) {
      naoCurtirButtons[i].addEventListener("click", function() {
        // Lógica para não curtir a mensagem
        var parent = this.parentNode.parentNode;
        var CurtirButton = parent.querySelector(".curtir-btn");
        CurtirButton.disabled = true;
        CurtirButton.classList.add("disabled");
      });
    }
  }
}

// Vincular a função enviarMensagem ao evento de clique do botão Enviar
document.getElementById("enviar").addEventListener("click", enviarMensagem);

// Exibir as mensagens ao carregar a página
exibirMensagens();