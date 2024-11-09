# Máscaras e validação de Input e Select

Uma forma fácil de adicionar validação e máscaras nos seus inputs.

Máscaras dispoíveis:

- CPF(`cpf`): `000.000.000-00`
- CNPJ(`cnpj`): `00.000.000/0000-00`
- CPF E CNPJ(`cpf-cnpj`): `000.000.000-00 ou 00.000.000/0000-00` essa máscara se adapta de acordo com o valor digitado.
- TELEFONE(`phone`): `(00) 0 0000-0000`
- NOME(`name`): `Nome Sobrenome de Nome`
- NÚMERO DE CARTÃO DE CRÉDITO(`card-number`): `0000 0000 0000 000
- DATA DE VALIDADE DE CARTÃO DE CRÉDITO(`card-data`): `00/00`
- PLACA DE CARRO(`plate`): `AAA-0000`
- CHASSI DE CARRO(`chassi`): `00000-00000-00000-00`

## Como usar

Para começar a validar seus inputs, primeiro você deve adicionar o `<ValidationProvider>` em volta de seus inputs, para isso, existe duas maneiras:

- Adcionar o `<ValidationProvider>` em volta do componente que contém seus inputs:

```js
function App() {
  return (
    <>
      <ValidationProvider>
        <PageLogin />
      </ValidationProvider>

      <PageRegister />
    </>
  )
}
```

- Como alternativa você pode colocar o `<ValidationProvider>` diretamente em volta dos inputs:

```js
function LoginPage() {
  return (
    <div>
      <ValidationProvider>
        {
          () =>
            <div>
              <input/>
            </div>
        }
      </ValidationProvider>
    </div>
  )
}
```
## Register, trigger e errors
O `<ValidationProvider>` vai expor 3 propriedade:
- `register`: é uma função que você pode usar para registrar seus inputs.
- `trigger`: é uma função que você pode usar para disparar a validação de seus inputs.
- `errors`: é um objeto que contém os erros de validação de seus inputs.

Observação: O `trigger` é disparado quando os seguintes eventos são disparados: `onBlur` e `onChange`.

- Se o `<ValidationProvider>` estiver em volta de seu componente, então você deve chamar o `useValidation` para acessar as propriedades:

```js
function PageLogin() {
  const { errors, register, trigger } = useValidation()

  return (
    <div>
    {/* ... */}
    </div>
  )
}
```

- Se o `<ValidationProvider>` estiver em volta de seus inputs, então você acessará as propriedades assim:

```js
function LoginPage() {
  return (
    <div>
      <ValidationProvider>
        {
          ({ register, trigger, errors }) =>
            <div>
              <input/>
            </div>
        }
      </ValidationProvider>
    </div>
  )
}
```