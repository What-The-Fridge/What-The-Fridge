# Web App For What The Fridge 🍎

## Preview
![ezgif com-gif-maker](https://user-images.githubusercontent.com/55214510/211989825-f56d03f1-d331-48ea-b96f-339562e296d8.gif)

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
