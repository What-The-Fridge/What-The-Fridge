# Web App For What The Fridge 🍎

## Set-up

**Requirement**

NodeJS latest v

**Install**

Run `npm install` to install all dependencies

## Running local server

```sh
`npm dev` or `yarn dev`     # it's running at http://localhost:3000/
```

## Using Graphql Code Gen

https://www.graphql-code-generator.com/docs/getting-started/index

- Add mutations to src/graphql/mutations/
- Add queries to src/graphql/mutations/
- Run `yarn gen`
- Hooks will be generated inside src/generated
