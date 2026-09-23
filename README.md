# Atividade: Arquitetura em Camadas

Programação Web II, Análise e Desenvolvimento de Sistemas. Projeto em TypeScript, com código em inglês.

Siga o enunciado entregue em aula. Resumo dos comandos:

```bash
npm install
npm run seed        # recria o banco data.db
npm run legacy      # versão monolítica, porta 3000
npm start           # versão em camadas, porta 3001
npm run typecheck   # confere erros de tipo (o servidor sobe mesmo com eles)
npm run check       # confere estrutura e respostas da API (com o servidor ligado)
```

Precisa de Node 18 ou mais recente.

Já vem pronto: `src/server.ts`, `src/errors/index.ts` e `src/types.ts`.
