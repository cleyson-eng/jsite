# Ferramentas
- node & deno (instalar por fora)
- npm package (`npm i` na raiz)
- typescript (`npm i -g typescript`)
- pug (`npm i -g pug`)
- sass (`npm i -g sass`)

## IDE (vscode) extensões:
- Sass
- Terminals Manager (auto run transpilers & test server)

# Comandos
## Transpiladores
`sass --watch transp/sass:tout/rsc/css`

`pug -w transp/pug -o tout`

`tsc -w`

## Servidor de teste
`deno run --allow-all serv.ts`

## Build
`deno run --allow-all build.ts`