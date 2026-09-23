# Respostas

Nome:

Como responder: nas questões objetivas, escreva a letra depois de **Resposta:**. A justificativa é opcional, mas ajuda na correção. Nas discursivas, escreva seu texto logo abaixo do enunciado.

---

## Parte 1: leitura

### Questão 1

Observe o controller abaixo, escrito na versão em camadas do projeto.

```ts
export class EmployeeController {
  constructor(private service: EmployeeService) {}
  // ...
}
```

Quem cria o `EmployeeService` e o entrega ao controller é o arquivo `server.ts`.

Considerando esse trecho, avalie as asserções a seguir e a relação proposta entre elas.

I. O controller recebe o service pelo construtor, em vez de criá-lo com `new` dentro da própria classe.

**PORQUE**

II. Assim, o controller depende apenas do que recebe, e quem monta o sistema decide qual implementação usar, o que permite, por exemplo, entregar um service falso em um teste.

A respeito dessas asserções, assinale a opção correta.

A) As asserções I e II são proposições verdadeiras, e a II é uma justificativa correta da I.
B) As asserções I e II são proposições verdadeiras, mas a II não é uma justificativa correta da I.
C) A asserção I é uma proposição verdadeira, e a II é uma proposição falsa.
D) A asserção I é uma proposição falsa, e a II é uma proposição verdadeira.
E) As asserções I e II são proposições falsas.

**Resposta:**

**Justificativa (opcional):**

---

### Questão 2

O trecho a seguir foi extraído de `legacy/app.ts`, a versão monolítica do sistema.

```ts
app.post('/employees', (req, res) => {
  const { name, email, salary, companyId } = req.body
  if (!email || !email.includes('@')) return res.status(400).send('invalid email')
  const company = db.prepare('SELECT * FROM companies WHERE id = ' + companyId).get()
  const gross = Number(salary)
  const net = gross - gross * 0.11
  res.send(`<h1>${name} created</h1>`)
})
```

Ao refatorar esse código para a arquitetura em camadas, qual linha deve ser levada para o **Service**?

A) `const { name, email, salary, companyId } = req.body`
B) `if (!email || !email.includes('@')) return res.status(400).send('invalid email')`
C) `const company = db.prepare('SELECT * FROM companies WHERE id = ' + companyId).get()`
D) `res.send(\`<h1>${name} created</h1>\`)`
E) `const net = gross - gross * 0.11`

**Resposta:**

**Justificativa (opcional):**

---

### Questão 3

Um sistema de cadastro precisa de duas validações antes de gravar um funcionário: o e-mail deve conter o caractere @, e o salário não pode ficar abaixo do salário mínimo vigente.

Com relação à camada responsável por cada validação, avalie as afirmações a seguir.

I. A verificação do @ no e-mail é uma validação de formato. Ela pertence ao DTO chamado pelo Controller e, quando falha, a API responde 400.

II. A verificação do salário mínimo é uma regra de negócio. Ela pertence ao Service e, quando falha, a API responde 422.

III. As duas validações devem ficar no Repository, porque ele é o último ponto do sistema antes do `INSERT` no banco.

IV. A regra do salário mínimo continuaria válida se o sistema fosse uma planilha, sem HTTP e sem banco, o que indica que ela é uma regra de domínio.

É correto o que se afirma em

A) I e II, apenas.
B) I e III, apenas.
C) II e IV, apenas.
D) I, II e IV, apenas.
E) I, II, III e IV.

**Resposta:**

**Justificativa (opcional):**

---

## Parte 4: estudo de caso

Leia o cenário abaixo. Ele vale para as questões 4 a 6.

> No sistema de funcionários, o RH pediu três mudanças para a próxima sprint:
> 
> - (a) exportar a folha de pagamento em CSV;
> - (b) aplicar uma alíquota de INSS diferente conforme o estado (`state`) da empresa;
> - (c) disponibilizar os mesmos dados para um app mobile.

### Questão 4

Considerando a versão em camadas que você construiu, avalie as afirmações a seguir.

I. Para o pedido (a), basta criar uma nova view e uma rota. O Service e os repositórios são reaproveitados.

II. Para o pedido (b), a mudança se concentra em `employee.service.ts`, que passa a consultar o `state` da empresa antes de calcular o INSS.

III. Para o pedido (c), é preciso reescrever `employee.service.ts` para que ele passe a responder em JSON.

É correto o que se afirma em

A) I, apenas.
B) I e II, apenas.
C) II, apenas.
D) II e III, apenas.
E) I, II e III.

**Resposta:**

**Justificativa (opcional):**

---

### Questão 5

Agora considere a versão `legacy/app.ts` e avalie as asserções a seguir e a relação proposta entre elas.

I. Na versão monolítica, atender a qualquer um dos três pedidos exige alterar a mesma rota, que concentra leitura da requisição, regra de negócio, SQL e montagem do HTML.

**PORQUE**

II. O TypeScript impede que uma alteração nessa rota cause erro em outra parte do sistema, já que todos os tipos são conferidos antes da execução.

A respeito dessas asserções, assinale a opção correta.

A) As asserções I e II são proposições verdadeiras, e a II é uma justificativa correta da I.
B) As asserções I e II são proposições verdadeiras, mas a II não é uma justificativa correta da I.
C) A asserção I é uma proposição verdadeira, e a II é uma proposição falsa.
D) A asserção I é uma proposição falsa, e a II é uma proposição verdadeira.
E) As asserções I e II são proposições falsas.

**Resposta:**

**Justificativa (opcional):**

---

### Questão 6 (discursiva)

Mesmo com a arquitetura em camadas pronta, um dos três pedidos do cenário continua exigindo mais esforço do que os outros.

Em seu texto, faça o que se pede:

a) identifique qual é esse pedido;
b) explique por que a separação em camadas não elimina esse esforço;
c) cite os arquivos do seu projeto que seriam alterados para atendê-lo.

(Até 10 linhas.)

**Resposta:**

---

### Questão 7 (discursiva)

O enunciado da atividade apresenta quatro erros comuns em projetos com MVC: controller monólito, regra de negócio na View, Service gigante e erro tratado em cada rota.

Com base na sua experiência durante esta atividade, faça o que se pede:

a) identifique qual desses erros você cometeu, ou qual chegou mais perto de cometer;
b) indique o arquivo e o trecho em que ele apareceu;
c) descreva como você corrigiu, ou como corrigiria.

(Até 10 linhas.)

**Resposta:**
