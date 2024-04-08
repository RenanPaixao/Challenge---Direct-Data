# Challenge - Direct Data

## Demo - [direct-data-gym.vercel.app](https://direct-data-gym.vercel.app)

---

## Descrição

O projeto consiste em uma aplicação web simulando um formulário de cadastro de usuários em aulas de boxe, adicionando 
numa api passada previamente e consumindo os dados para exibição em uma tabela. 

---

## Como foi pensado?

Pensei em dividir a aplicação em 3 partes principais:

1. Formulário de cadastro
2. Visualização dos dados
3. Ajustes gerais que não eram bloqueantes para o produto final, mas que deviam ser feitos, como preenchimento 
campos usando o cep

Com isso em mente, criei um mockup de baixíssima fidelidade, para não gastar muito tempo com o design e focar na 
implementação. O design serviria muito mais como um guia de onde iria cada coisa.

Link para o mockup: [Figma](https://www.figma.com/file/6jL5rUb9TKgmX18qP7596A/Direct-Data---Challenge)

### Formulário de cadastro

O formulário foi feito pensando numa melhor usabilidade, dividindo em 3 partes e usando etapas (Sobre você, Endereço e 
Revisão). Durante o fluxo, os dados são salvos na session storage, dando possibilidade de atualizar a página ou voltar para a etapa anterior sem 
perder os dados.

Os dados só são enviados para a api no final do fluxo, na etapa de revisão, onde o usuário pode rever os dados e confirmar.

Todos os campos tem validação de com o Yup, e o formulário só pode ser enviado se todos os campos passarem.

- Validações adicionadas:
    - CEP (formato)
    - CPF (formato e validação se o cpf é válido)
    - Telefone (formato)
    - Email (formato)
    - Todos os campos tem um tamanho máximo de caracteres.

O cep tem uma integração com a api do ViaCEP, que preenche os campos de endereço automaticamente.

### Visualização dos dados

A tabela está na rota `/all-students` ([link](https://direct-data-gym.vercel.app/all-students)) e é carregada ao entrar na página.

Na tabela, temos a possibilidade de buscar os valores de cada coluna, ordenar de forma crescente ou decrescente 
ao clicar no header, e editar os dados de cada célula clicando diretamente em cada.

Demo:

https://github.com/RenanPaixao/Challenge---Direct-Data/assets/57810270/319d7991-4ceb-44e7-a416-bfc0bb8cb383

### Ajustes gerais

Algumas coisas considerei como não bloqueantes, mas que deviam ser feitas caso eu conseguisse avançar bem sem travamentos:

- Integração com a api do ViaCEP para preencher os campos de endereço automaticamente.
- Estilização personalizada do componente de etapas
- A Home page (tive dificuldade com o design)
- Formato da data nos campos de data de nascimento (o default do chakra era em mm/dd/yyyy e eles não possuem um datepicker)

Apesar de serem consideradas como não bloqueantes, todas elas foram concluídas. Sem elas, a UX da aplicação seria bem prejudicada.

### Testes

Unitários:

- Criei testes unitários usando vitest e testing library (muito boa para testar a acessibilidade dos componentes), 
para os componentes mais importantes da aplicação, como o formulário e a tabela.

End to end:
- Já para os testes end to end, usei o cypress e também a testing library, para testar os principais fluxos da 
aplicação, como o cadastro com um responsável e o cadastro sem um responsável.

---

Além disso, todas as imagens adicionadas tinham o formato **webp** ou **svg**, para melhor carregamento.

## Tecnologias

- React with Typescript
- Chakra UI
- Axios
- Cypress
- Vitest 
- Testing Library
- Formik with Yup for form handling
- AgReactTable 

---

## Como rodar

1. Clone o repositório
2. Instale as dependências

```bash
yarn
```

3. Crie o arquivo .env copiando o conteúdo do arquivo .env.example e substitua as variáveis de ambiente

4. Rode o projeto

```bash
yarn dev
```

e abra o navegador na url mostrada no terminal.

---

## Como rodar os testes

### Unitários
```bash
yarn vitest
```

### End to end

```bash
yarn cypress run
```
---


