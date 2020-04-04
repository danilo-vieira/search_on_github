var listElement = document.querySelector('div#app ul');
var inputElement = document.querySelector('div#user-tools input');
var buttonElement = document.querySelector('div#user-tools button');

function searchRepos() {
  var github_user = inputElement.value;
  inputElement.focus();

  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${github_user}/repos`);
    xhr.send(null);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject(error);
        }
      }
    }
  })
}

function renderRepos(repo_list) {
  listElement.innerHTML = '';

  for (repo of repo_list) {
    var li = document.createElement('li');

    // Título do repositório
    var repoName = document.createTextNode('Nome do repositório: ' + repo.name);

    // Descrição do repositório
    var repoDescription = document.createTextNode('Descrição: ' + repo.description);

    // Link do repositorio
    var link = document.createElement('a');
    var labelLink = document.createTextNode('Link para o repositório');
    link.setAttribute('href', repo.html_url);
    link.setAttribute('target', '_blank')
    link.appendChild(labelLink);

    var br1 = document.createElement('br');
    var br2 = document.createElement('br');

    li.appendChild(repoName);
    li.appendChild(br1);

    li.appendChild(repoDescription);
    li.appendChild(br2);

    li.appendChild(link);

    listElement.appendChild(li);
  }
}

buttonElement.onclick = 
() => searchRepos()
  .then(function(response) {
    document.querySelector('div#app').classList.toggle('show');

    var li = document.createElement('li');
    var liText = document.createTextNode('Carregando...');

    li.appendChild(liText);
    listElement.appendChild(li);

    var repo_list = response || [];
    setTimeout(function() {
      renderRepos(repo_list);
    }, 1000);
  })
  .catch(function(error) {
    alert(error);
  });
