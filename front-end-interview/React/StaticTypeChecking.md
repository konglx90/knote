1. add type definitions for your library

`yarn add --dev @types/react`

2. Local Declarations

At your source code root src
```js
// declarations.d.ts
declare module 'querystring' {
  export function stringify(val: object): string
  export function parse(val: string): object
}
```
