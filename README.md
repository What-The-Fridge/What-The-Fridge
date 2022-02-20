# Web App For What The Fridge 🍎

## Set-up

**Requirement**

- NodeJS latest v
- Yarn

**Install**

Run `npm install` to install all dependencies

**Environment Variables**

Create a `.env.local` file in the root folder, ask Hachi for keys

## Running local server

```sh
  yarn dev    # it's running at http://localhost:3000/
```

## Using Graphql Code Gen

https://www.graphql-code-generator.com/docs/getting-started/index

- Make sure the server is running first!
- Add mutations to src/graphql/mutations/
- Add queries to src/graphql/mutations/
- Run `yarn gen`
- Hooks will be generated inside src/generated
