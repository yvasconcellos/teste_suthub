# Prova - Dev Front-end Pleno

## Descrição do Projeto

Este projeto é uma aplicação web desenvolvida como parte de um teste técnico para a posição de Desenvolvedor Front-end Pleno na Suthub. O objetivo é construir uma aplicação que consuma dados de uma API pública de países (https://restcountries.com/) e apresente esses dados em diferentes formatos. Além disso, a aplicação deve conter um formulário de cadastro dummy para validação de dados.

## Tecnologias Utilizadas

- Vue 3
- Nuxt 3
- Nuxt UI
- Tailwind CSS
- Axios (para requisições HTTP)
- Chart.js (para gráficos)
- Outras bibliotecas e ferramentas externas conforme necessário

## Funcionalidades

### 1. Formulário de Cadastro

A aplicação deve conter uma página com um formulário de cadastro contendo os seguintes campos:

- **Data de nascimento**: Campo de data em formato brasileiro, permitindo uma idade máxima de 65 anos e mínima de 18 anos.
- **Nome completo**: Campo de texto que exige ao menos duas palavras.
- **CPF**: Campo obrigatório que valida o CPF segundo a regra oficial.
- **Espécie do pet**: Select obrigatório com opções "cão" ou "gato".
- **Raça do pet**: Select obrigatório que lista 5 raças para "cão" e 5 para "gato". Dependendo da seleção anterior, exibe apenas as raças adequadas. Uma sexta opção chamada "outro" está disponível em ambas as listas.
- **Outro**: Caso a opção "outro" seja selecionada no campo anterior, um campo de texto obrigatório aparecerá.
- **Renda mensal**: Campo de texto para números com prepend "R$", valor mínimo de R$ 1000,00.
- **CEP**: Campo obrigatório e formatado corretamente, com buscador de CEP para preencher automaticamente os campos de endereço (Rua, Bairro, Cidade, Estado).
- **Endereço**:
  - Rua (obrigatório)
  - Bairro (obrigatório)
  - Cidade (obrigatório)
  - Estado (obrigatório, somente 2 letras maiúsculas)

O formulário deve validar todas as informações e impedir o submit caso alguma informação esteja incorreta ou incompleta. Se todas as informações estiverem corretas, elas devem ser apresentadas em uma nova página ou modal, devidamente organizadas e formatadas.

### 2. Lista de Países da América

Uma página que usa a API de países para apresentar uma lista com o nome e a capital de cada país da América. Ao clicar em um país, uma nova aba é aberta no Google Maps centralizada no país em questão.

### 3. Busca por País

Uma página com uma função de busca por país, onde o usuário pode digitar o nome de qualquer país do mundo. A aplicação deve encontrar o país ou países de nome similar, apresentando o nome correto e os idiomas oficiais. Ao clicar em um idioma listado, a aplicação apresenta os nomes de todos os países que possuem o idioma em comum.

### 4. Gráfico de Área e População

Uma página com um gráfico que mostra a área e população de cada país de uma região geográfica (América, Europa, etc.). O gráfico deve salientar a diferença de área geográfica e população de maneira visual.


## Instruções de Configuração e Execução

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/yvasconcellos/teste_suthub.git
   cd teste-suthub
   ```
2. **Instale as dependências:**
   ```sh
   npm install
   ```
3. **Inicie o servidor de desenvolvimento:**
   ```sh
   npm run dev
   ```
4. **Acesse a aplicação no navegador:**
   - Abra o navegador e navegue até http://localhost:3000.

## Considerações Finais

A aplicação foi desenvolvida para ser responsiva e proporcionar uma boa experiência de usuário. Foram utilizadas práticas modernas de desenvolvimento front-end com Vue 3, Nuxt 3, e Tailwind CSS. A validação dos dados do formulário e a integração com a API pública de países foram implementadas com foco em usabilidade e apresentação.
