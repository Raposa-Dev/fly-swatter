# Projeto: Jogo Mata Mosca
 
Este é um jogo em JavaScript de matar moscas. Os jogadores clicam em moscas que aparecem aleatoriamente em uma tela para pontuar. O jogo termina quando três moscas estão visíveis na tela ao mesmo tempo.

## Funcionalidades
- **Posicionamento aleatório das moscas:** As moscas aparecem em locais aleatórios na tela.
- **Pontuação:** Os jogadores ganham pontos a cada mosca que matam.
- **Fim de jogo:** O jogo termina quando três moscas estão visíveis ao mesmo tempo.
- **Funcionalidade de iniciar/pausar:** Os jogadores podem iniciar, pausar e retomar o jogo.
- **Reiniciar:** O jogo pode ser reiniciado para o estado inicial.

## Tecnologias
- **HTML:** Estrutura da página do jogo.
- **CSS:** Estilização dos elementos do jogo.
- **JavaScript:** Lógica do jogo, manipulação de eventos e DOM.

## Como usar
1. Clone o repositório: `https://github.com/Raposa-Dev/fly-swatter`
2. Abra o arquivo HTML: Abra o arquivo `index.html` em um navegador.
3. Jogue: Clique nas moscas para pontuar e evite que o jogo termine.

## Personalização
- **Imagens:** Substitua as imagens `fly.png` e `table.png` pelas suas próprias.
- **Dificuldade:** Ajuste a taxa de aparição das moscas na função `createNewSquare`.
- **Condição de fim de jogo:** Modifique a função `endGame` para implementar diferentes critérios de fim de jogo.

## Problemas conhecidos
- **Sem efeitos sonoros:** Não há efeitos sonoros para matar moscas ou para o fim do jogo.
- **Sem vencedores:** O jogo enquanto não perder não tem fim.
- **Sem níveis:** Não há alteração de dificuldades.

## Melhorias futuras
- **Efeitos sonoros:** Adicionar efeitos sonoros para melhorar a experiência do jogo.
- **Níveis de dificuldade:** Implementar diferentes níveis de dificuldade.
- **Power-ups:** Introduzir power-ups que podem ajudar os jogadores, como diminuir a velocidade de movimento das moscas ou aumentar os pontos.
