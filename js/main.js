var getlooser = new getLooser;

function getLooser() {
  //vai hospedar outras funções
  //toda vez que tem um constructor, usa o this, fazndo ref. a esta função
  this.applicants = [];

  //inicia a aplicação
  this.init = function () {
    this.addApplicants();
    this.getRandomUser();
    this.runAgain();
    this.startOver();
  }

  this.showList = function () {
    var parent = document.querySelector('.applicant_list_wrapper');
    var template = '';
    //pegar a lista e fazer um loop pra por na tela
    for (var i = 0; i < this.applicants.length; i++) {
      template += '<span class="name-tag" data-id="' + i + '">' + this.applicants[i] + '</span>';
    }

    parent.innerHTML = '';
    //LIMPA O QUE está dentro de parent (a lista);
    parent.insertAdjacentHTML('afterbegin', template);
    this.deleteOne();
  }

  this.addApplicants = function () {
    var $this = this; //referência a getLooser
    //pega o valor do input
    function generateList(input) {
      var value = input.value;

      //validar informações
      if ($this.checkValid(value.toLowerCase())) {
        //valor válido, adiciona à lista
        $this.applicants.push(value);
        input.value = '';
        $this.showList();
      } else {
        //mostra mensagem de erro
        alert('Algo está errado!')
      }
    }

    //escuta o evento, clica em add, pega o evento e o conteúdo do input
    var addBtn = document.querySelector('#add_applicant');
    addBtn.addEventListener('click', function () {
      var input = document.querySelector('#applicant_value');

      generateList(input);
    })
  }

  this.checkValid = function (value) {
    if (this.applicants.indexOf(value) < 0 && value !== '') {
      //vai em frente
      return true;
    }
    return false;
  }

  this.getRandomUser = function () {
    var $this = this;
    var resultsButton = document.querySelector('#show_results');

    function showLooser() {
      var resultsContainer = document.querySelector('.results_container');
      var applicantsContainer = document.querySelector('.applicant_container');

      applicantsContainer.className += ' hidden'; //adiciona hidden
      resultsContainer.className = 'results_container';

      $this.showRandomUser();

    }

    resultsButton.addEventListener('click', function (e) {
      if ($this.applicants.length > 1) {
        showLooser();
      } else {
        alert('Yor need more users')
      }
    })
  }

  this.showRandomUser = function () {
    var resultsContainer = document.querySelector('.result')
    var rand = this.applicants[Math.floor(Math.random() * this.applicants.length)];

    resultsContainer.innerHTML = '';
    resultsContainer.insertAdjacentHTML('afterbegin', '<h3>' + rand + '</h3>')
  }

  this.runAgain = function () {
    var $this = this;
    var runAgainBtn = document.querySelector('.run_again');
    runAgainBtn.addEventListener('click', function (e) {
      $this.showRandomUser();
    })
  }

  this.startOver = function () {
    var $this = this;
    var startOverBtn = document.querySelector('.start-over');
    startOverBtn.addEventListener('click', function (e) {
      //limpar o container de resultados
      var resultsContainer = document.querySelector('.results_container');
      var applicantsContainer = document.querySelector('.applicant_container');
      var applicantsWrapper = document.querySelector('.applicant_list_wrapper');
      //adicionar a classe hidden pra voltar pra tele inicial
      resultsContainer.className = 'results_container hidden';

      //ir ate o applicant_container e remover o hidden
      applicantsContainer.className = '.applicant_container';
      //ir pra applicant_wrapper e limpar o conteúdo
      applicantsWrapper.innerHTML = '';

      $this.applicants = [];
    })
  }


  this.deleteOne = function () {
    var $this = this;
    var item = document.querySelectorAll('.name-tag');

    function removeIt(element) {
      //pega o evento, o nome na lista de applicantes e gera novamente a lista de nomes
      var attr = parseInt(element.getAttribute('data-id'));

      //abrir a lista de participantes e remover
      $this.applicants.splice(attr, 1);

      $this.showList();

    };

    for (var i = 0; i < item.length; i++) {
      item[i].addEventListener('click', function (e) {
        removeIt(this); //this se refere ao item a ser removido
      })
    }
  }

}

getlooser.init()

