(function () {
  var saved = localStorage.getItem('sportguard-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var root = document.documentElement;
      var current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', current);
      localStorage.setItem('sportguard-theme', current);
    });
  }

  document.addEventListener('click', function (e) {
    document.querySelectorAll('.dropdown[open]').forEach(function (d) {
      if (!d.contains(e.target)) d.removeAttribute('open');
    });
  });

  document.querySelectorAll('.dot-btn, .vial-btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var item = btn.closest('.hotspot, .vial-item');
      var wasActive = item.classList.contains('active');
      document.querySelectorAll('.hotspot.active, .vial-item.active').forEach(function (o) { o.classList.remove('active'); });
      if (!wasActive) item.classList.add('active');
    });
  });
  document.addEventListener('click', function () {
    document.querySelectorAll('.hotspot.active, .vial-item.active').forEach(function (o) { o.classList.remove('active'); });
  });
});





// Linha 1: (function () { — abre uma função anônima e já vai chamar ela na hora (por causa dos () no final, linha 4). Isso é uma IIFE (função que se autoexecuta). Serve pra rodar esse código imediatamente, sem esperar nada, e sem criar variáveis "soltas" que poderiam bagunçar o resto do script.

// Linha 2: var saved = localStorage.getItem('sportguard-theme'); — localStorage é uma "gaveta" que o navegador guarda por site, e continua salva mesmo se fechar a aba. getItem('sportguard-theme') procura por algo salvo com essa chave. Se já existe (de uma visita anterior), guarda o valor ('light' ou 'dark') na variável saved. Se não existe, saved fica null.

// Linha 3: if (saved) document.documentElement.setAttribute('data-theme', saved); — document.documentElement é a tag <html>. Se saved tem algum valor (não é null), aplica esse valor no atributo data-theme do <html>. É esse atributo que o CSS usa (html[data-theme="dark"]{...}) pra saber se pinta tudo no modo claro ou escuro.

// Linha 4: })(); — fecha a função (o }) e os () no final são o que manda executar ela imediatamente.

// Linha 5: linha em branco, só separação visual.

// Linha 6: document.addEventListener('DOMContentLoaded', function () { — registra um "ouvinte" no documento inteiro: quando o evento DOMContentLoaded disparar (que é o momento em que o navegador terminou de montar todo o HTML na memória), roda a função que vem entre { }. Tudo daqui até a linha 35 fica dentro dessa função.

// Linha 7: var toggle = document.querySelector('.theme-toggle'); — procura no HTML o primeiro elemento com a classe theme-toggle (o botão da lua/sol) e guarda ele na variável toggle.

// Linha 8: if (toggle) { — só continua se achou o botão (evita erro caso, por algum motivo, o botão não exista na página).

// Linha 9: toggle.addEventListener('click', function () { — registra que, quando esse botão for clicado, roda a função que vem a seguir.

// Linha 10: var root = document.documentElement; — de novo pega a tag <html> e guarda em root, pra não ficar escrevendo document.documentElement toda hora.

// Linha 11: var current = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'; — isso é um "if resumido" (operador ternário). Lê o data-theme atual do <html>. Se for 'dark', current vira 'light'. Se for qualquer outra coisa, current vira 'dark'. Ou seja: inverte o tema.

// Linha 12: root.setAttribute('data-theme', current); — aplica esse novo valor no <html>, o que faz o CSS mudar todas as cores na hora.

// Linha 13: localStorage.setItem('sportguard-theme', current); — salva esse novo tema na gaveta do navegador, com a mesma chave 'sportguard-theme' que a linha 2 lê. É isso que faz o tema "lembrar" na próxima visita.

// Linha 14: }); — fecha a função de clique (linha 9).

// Linha 15: } — fecha o if (toggle) da linha 8.

// Linha 16: linha em branco.

// Linha 17: document.addEventListener('click', function (e) { — registra um clique em qualquer lugar da página inteira. O e é o "objeto do evento", carrega informação de onde o clique aconteceu.

// Linha 18: document.querySelectorAll('.dropdown[open]').forEach(function (d) { — procura todos os elementos com classe dropdown que tenham o atributo open (eram os menus suspensos do menu antigo, que já não existe mais no HTML). forEach roda a função abaixo pra cada um encontrado.

// Linha 19: if (!d.contains(e.target)) d.removeAttribute('open'); — e.target é o elemento exato que foi clicado. d.contains(...) checa se esse elemento clicado está DENTRO do dropdown d. O ! inverte: se NÃO estiver dentro (ou seja, clicou fora), remove o atributo open, fechando o menu.

// Linha 20: }); — fecha o forEach (linha 18).

// Linha 21: }); — fecha o addEventListener de clique (linha 17).
// (Nota: como não existe mais nenhum .dropdown no HTML, esse bloco 17-21 não faz mais nada — é sobra do menu antigo que a gente tirou.)

// Linha 22: linha em branco.

// Linha 23: document.querySelectorAll('.dot-btn, .vial-btn').forEach(function (btn) { — pega TODOS os botões pontinho do boneco (.dot-btn) e TODAS as seringas (.vial-btn) de uma vez, e roda a função abaixo pra cada um, guardando o elemento atual em btn.

// Linha 24: btn.addEventListener('click', function (e) { — registra que, quando aquele botão específico (btn) for clicado, roda essa função.

// Linha 25: e.stopPropagation(); — impede que esse clique "suba" e dispare o ouvinte de clique do document (o da linha 32). Se não tivesse essa linha, ao tocar num pontinho ele abriria e fecharia no mesmo instante.

// Linha 26: var item = btn.closest('.hotspot, .vial-item'); — closest sobe pela árvore do HTML a partir do botão procurando o ancestral mais próximo que seja .hotspot (o caso do boneco) ou .vial-item (o caso da seringa), e guarda em item. É a "caixa" inteira daquele ponto (botão + caixinha de texto).

// Linha 27: var wasActive = item.classList.contains('active'); — verifica se esse item já estava com a classe active (ou seja, se a caixinha dele já estava aberta) ANTES desse clique, e guarda true/false em wasActive.

// Linha 28: document.querySelectorAll('.hotspot.active, .vial-item.active').forEach(function (o) { o.classList.remove('active'); }); — pega qualquer ponto/seringa que esteja atualmente aberto (com classe active) em QUALQUER lugar da página, e fecha todos (remove a classe). Isso garante que só uma caixinha fica aberta por vez.

// Linha 29: if (!wasActive) item.classList.add('active'); — se esse item NÃO estava aberto antes (do clique), abre ele agora (adiciona active). Se já estava aberto, não reabre — assim, tocar de novo no mesmo ponto fecha em vez de reabrir.

// Linha 30: }); — fecha a função de clique do botão (linha 24).

// Linha 31: }); — fecha o forEach que percorre todos os botões (linha 23).

// Linha 32: document.addEventListener('click', function () { — mais um ouvinte de clique na página inteira (esse é separado do de cima).

// Linha 33: document.querySelectorAll('.hotspot.active, .vial-item.active').forEach(function (o) { o.classList.remove('active'); }); — fecha qualquer caixinha aberta. Como esse ouvinte está no document (não em um botão específico) e os cliques nos botões já usaram stopPropagation() (linha 25) pra não chegar até aqui, esse trecho só dispara quando o toque foi em qualquer outro lugar da página — ou seja, "tocou fora, fecha tudo".

// Linha 34: }); — fecha essa função de clique (linha 32).

// Linha 35: }); — fecha a função grande do DOMContentLoaded que começou lá na linha 6.

// os de abrir e fechar n precisa explicar só quero saber da parte do codigo oq que cada coisa ta fazendo

// Beleza, só o que cada trecho faz:

// Bloco 1 (linhas 1-4) — carrega o tema salvo

// localStorage.getItem('sportguard-theme') → busca na "gaveta" do navegador se já tem um tema salvo de visita anterior.
// Se tiver, aplica esse tema no <html> (data-theme) na hora, antes da página aparecer, pra não dar aquele flash de tela clara e depois escurecer.

// Bloco 2 (linhas 7-15) — o botão de trocar tema

// document.querySelector('.theme-toggle') → acha o botão da lua no topbar.
// Ao clicar: olha o tema atual (data-theme do <html>), inverte (se tá dark vira light, e vice-versa).
// Aplica esse novo tema no <html>.
// Salva o novo tema no localStorage, pra lembrar na próxima visita.

// Bloco 3 (linhas 17-21) — sobra do menu antigo

// Fecha um .dropdown[open] se clicar fora dele. Mas esse .dropdown não existe mais no HTML (era do menu suspenso que a gente removeu), então esse trecho tá morto, não faz nada.

// Bloco 4 (linhas 23-31) — abrir a caixinha ao tocar (celular)

// Pega todos os pontinhos do boneco (.dot-btn) e todas as seringas (.vial-btn).
// Ao tocar num deles: primeiro fecha qualquer caixinha que já estivesse aberta em outro ponto/seringa.
// Depois, se aquele que foi tocado NÃO estava aberto, abre ele (adiciona a classe active, que é o que o CSS usa pra mostrar a caixinha).
// Se ele já estava aberto, não reabre — então tocar de novo no mesmo ponto fecha.
// e.stopPropagation() impede que esse toque também dispare o bloco 5 (senão abriria e fecharia no mesmo instante).

// Bloco 5 (linhas 32-34) — fechar tudo ao tocar em outro lugar

// Qualquer toque na página que não seja em um pontinho/seringa (por causa do stopPropagation do bloco 4) fecha todas as caixinhas abertas.