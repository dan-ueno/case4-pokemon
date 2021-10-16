Case 4 - Pokemon

## Primeiros Passos

- Clonar este repositório
- Executar `npm install` para adicionar as dependências
- Executar `npm run migrations` para criação da tabela
- Criar um arquivo .env na raiz do projeto e preencher as chaves a seguir com os valores apropriados:
  ```
  DB_HOST =
  DB_USER =
  DB_PASSWORD =
  DB_DATABASE_NAME =
  ```

## Entidadde: Pokemon

Possuem:

- pokedex,
- name,
- generation,
- type1,
- type2 ,
- stat_total,
- atk,
- def,
- sta.

## Como solicitar dados:

Esta aplicação utiliza apenas 1 endpoint para que o usuário realize data-fetching através de query params, com a seguinte ordem de prioridade nas requisições:

1. name
2. gen
3. type
4. all pokemon

usuário pode definir a página e limitar a quantidade de resultados exibidos, através dos parâmetros **page** e **limit** (por padrão, page = 1 e limit = 10)

## Postman

https://documenter.getpostman.com/view/15825766/UV5WDJEt
