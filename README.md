# @kenero/use-validate

Validação simples, máscaras em tempo real e exibição de erros para formulários React — com uma API minimalista e tipada.

> **Stack:** React + TypeScript
>
> **Use cases:** checkouts, cadastros, pagamentos, formulários com muitos inputs.

---

## 🚀 Instalação

```bash
npm i @kenero/use-validate
# ou
yarn add @kenero/use-validate
```

---

## ⚡️ Comece rápido

```tsx
import { ValidationProvider, useValidation } from "@kenero/use-validate";

export default function App() {
  return (
    <ValidationProvider>
      <CheckoutForm />
    </ValidationProvider>
  );
}

function CheckoutForm() {
  const { register, trigger, errors, resetErros } = useValidation();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trigger()) {
      // Envie os dados com segurança
      console.log("Form válido!");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {/* CPF com máscara + required */}
      <input
        {...register("cpf", () => {}, { required: true, mask: "cpf" })}
        placeholder="CPF"
      />
      {errors?.cpf?.error && <small>{errors.cpf.message}</small>}

      {/* Telefone com máscara */}
      <input
        {...register("phone", () => {}, { mask: "phone" })}
        placeholder="Telefone"
      />
      {errors?.phone?.error && <small>{errors.phone.message}</small>}

      <button type="submit">Enviar</button>
      <button type="button" onClick={() => resetErros()}>Limpar erros</button>
    </form>
  );
}
```

---

## 🧠 Conceitos

* **`ValidationProvider`**: provê o contexto de validação e máscaras.
* **`useValidation()`**: acessa a API do formulário atual.
* **`register(id, onChange, options)`**: conecta qualquer `<input>` ou `<select>`.

  * Retorna **`{ ref, onBlur, onChange }`** para plugar diretamente no elemento.
* **`trigger(keys?)`**: valida todos os campos (ou apenas os informados).
* **`resetErros(keys?)`**: limpa erros globalmente (ou seletivamente).
* **`errors`**: dicionário `{ [id]: { error: boolean; message: string } }`.

---

## 📦 API (Tipos)

```ts
interface ErrosValidation {
  [key: string]: { error: boolean; message: string } | undefined | null;
}

interface Options {
  cpf?: boolean;               // valida padrão CPF
  cnpj?: boolean;              // valida padrão CNPJ
  nameAndLastName?: boolean;   // exige nome e sobrenome
  required?: boolean;          // campo obrigatório
  nameOptional?: string;       // nome legível do campo para mensagens
  minLength?: number;          // tamanho mínimo
  mask?:
    | "cpf"
    | "phone"
    | "card-number"
    | "card-data"
    | "name"
    | "cpf-cnpj"
    | "cnpj"
    | "plate"
    | "chassi"
    | "cep";
}

type TypeRegister = <T extends HTMLInputElement | HTMLSelectElement>(
  id: string,
  onChange: (e: React.ChangeEvent<T>) => void,
  options?: Options
) => {
  ref: React.RefObject<T>;
  onBlur: (e: React.ChangeEvent<T>) => void;
  onChange: (e: React.ChangeEvent<T>) => void;
};
```

### Contexto e Provider

```ts
declare const ValidationContext: React.Context<ValidationContext>;

declare const ValidationProvider: React.ForwardRefExoticComponent<
  (ValidationProviderProps | ValidationProviderElementProps) &
  React.RefAttributes<ValidationContext | undefined>
>;

declare const useValidation: () => ValidationContext;
```

---

## 🧩 `ValidationProvider` — duas formas de usar

### 1) Como wrapper padrão (children como nós React)

```tsx
<ValidationProvider>
  <MeuForm />
</ValidationProvider>
```

### 2) Como *render prop* (acesso direto ao contexto)

```tsx
<ValidationProvider>
  {(ctx) => <MeuForm ctx={ctx} />}
</ValidationProvider>
```

Use o formato que preferir — ambos expõem a mesma API por `useValidation()` ou pelo parâmetro `ctx`.

---

## 🧰 `register` em detalhe

```tsx
<input
  {...register(
    "email",
    (e) => {
      // Seu estado/controlador também recebe o onChange
      // Ex: setEmail(e.target.value)
    },
    { required: true, minLength: 5, nameOptional: "E-mail" }
  )}
  placeholder="E-mail"
/>
{errors?.email?.error && <span role="alert">{errors.email.message}</span>}
```

**O que acontece por baixo:**

* Aplica **máscara** (se houver) a cada `onChange`.
* Executa **validações** declarativas conforme `options`.
* Em `onBlur`, revalida e atualiza `errors[id]`.

> Dica: se você já controla o estado do campo (controlled input), continue usando seu `setState` dentro do `onChange` que você passa para o `register`.

---

## 🧪 `trigger` e `resetErros`

```ts
trigger();           // valida tudo
trigger(["cpf"]);    // valida só alguns campos
resetErros();        // limpa todos os erros
resetErros(["cpf"]);// limpa erros selecionados
```

`trigger()` retorna `true` se **todos** os campos validados estiverem ok.

---

## 🔤 Máscaras disponíveis

| Máscara     | ID em `mask`    | Comportamento (exemplo)            |
| ----------- | --------------- | ---------------------------------- |
| CPF         | `"cpf"`         | `123.456.789-09`                   |
| CNPJ        | `"cnpj"`        | `12.345.678/0001-90`               |
| CPF ou CNPJ | `"cpf-cnpj"`    | Detecta pelo tamanho e formata     |
| Telefone    | `"phone"`       | `(**) * ****-****` (dinâmico)      |
| Cartão nº   | `"card-number"` | `#### #### #### ####`              |
| Cartão data | `"card-data"`   | `MM/AA`                            |
| Nome        | `"name"`        | Remove números/sinais; capitaliza  |
| Placa       | `"plate"`       | Padrão brasileiro (ex.: `ABC1D23`) |
| Chassi      | `"chassi"`      | Limita e normaliza alfanumérico    |
| CEP         | `"cep"`         | `#####-###`                        |

> A máscara é aplicada durante o `onChange`. Em `onBlur`, a validação final ajusta mensagens de erro se necessário.

---

## ✅ Regras de validação prontas

* `required`: não permite vazio.
* `minLength`: impõe tamanho mínimo.
* `cpf`: valida estrutura/dígitos do CPF.
* `cnpj`: valida estrutura/dígitos do CNPJ.
* `nameAndLastName`: exige ao menos duas palavras válidas.
* `nameOptional`: rótulo amigável usado em mensagens (ex.: "O campo **E-mail** é obrigatório").

> Combine regras livremente com qualquer máscara.

---

## 🧩 Exemplos práticos

### CPF obrigatório + mensagem customizada

```tsx
<input
  {...register("cpf", () => {}, { required: true, mask: "cpf", nameOptional: "CPF" })}
  placeholder="CPF"
/>
{errors?.cpf?.error && <small>{errors.cpf.message}</small>}
```

### Nome e sobrenome, com limpeza de caracteres

```tsx
<input
  {...register("nome", () => {}, { nameAndLastName: true, mask: "name", required: true })}
  placeholder="Nome completo"
/>
```

### Telefone dinâmico (8/9 dígitos)

```tsx
<input
  {...register("phone", () => {}, { mask: "phone", required: true })}
  placeholder="(00) 0 0000-0000"
/>
```

### CEP com busca posterior (ex.: preencher endereço)

```tsx
<input
  {...register("cep", () => {}, { mask: "cep", required: true })}
  placeholder="00000-000"
  onBlur={(e) => {
    // opcional: fetch do endereço pelo CEP limpo
  }}
/>
```

### Select com validação

```tsx
<select
  {...register("uf", () => {}, { required: true, nameOptional: "Estado" })}
  defaultValue=""
>
  <option value="" disabled>Selecione</option>
  <option value="SP">SP</option>
  <option value="RJ">RJ</option>
</select>
{errors?.uf?.error && <small>{errors.uf.message}</small>}
```

---

## ♿ Acessibilidade

* Exiba mensagens de erro com `role="alert"` quando aplicável.
* Associe `label`/`htmlFor` e `id` de cada campo registrado.
* Use `aria-invalid={errors?.[id]?.error || false}` nos inputs para sinalizar estado.

---

## 🧪 Padrões de uso (UI libs)

### shadcn/ui + Tailwind (exemplo)

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function FieldCPF() {
  const { register, errors } = useValidation();

  return (
    <div className="grid gap-1">
      <Label htmlFor="cpf">CPF</Label>
      <Input id="cpf" {...register("cpf", () => {}, { mask: "cpf", required: true })} />
      {errors?.cpf?.error && (
        <p role="alert" className="text-sm text-red-600">{errors.cpf.message}</p>
      )}
    </div>
  );
}
```

---

## 🧩 Dicas & Boas práticas

* **IDs únicos**: o primeiro parâmetro do `register` é a chave em `errors` — mantenha-o estável.
* **onBlur remove erros**: quando o campo volta a ficar válido, o erro correspondente é **limpo automaticamente** ao perder o foco.
* **Controlled inputs**: continue controlando seu estado normal; o `register` apenas adiciona máscara/validação.
* **Validação seletiva**: use `trigger(["campo1", "campo2"])` em etapas do formulário.

---

## ❓FAQ

**Preciso usar `useState` para todos os campos?**
Não é obrigatório. O `register` já aplica máscara/validação. Use estado próprio se precisar ler valores no ato.

**Consigo validar apenas uma parte do formulário?**
Sim, passe as chaves para `trigger(["cpf", "cep"])`.

**Como limpo mensagens de erro após corrigir o valor?**
Erros são atualizados em `onBlur`. Para limpar globalmente, use `resetErros()`; para casos específicos, `resetErros(["id"])`.

---

## 🔌 API Completa (Resumo)

### `ValidationProvider`

* Aceita `children` como nós React **ou** como função `(ctx) => JSX`.

### `useValidation()` → `ValidationContext`

* `register: TypeRegister`
* `trigger(keys?: string[]): boolean`
* `resetErros(keys?: string[]): void`
* `errors: ErrosValidation`

### `TypeRegister`

* Parâmetros: `(id, onChange, options?)`
* Retorno: `{ ref, onBlur, onChange }`

---

## 🗺️ Roadmap

* Mensagens de erro totalmente customizáveis por regra.
* Hooks utilitários para extrair valores mascarados/limpos.
* Suporte a mais máscaras nacionais.

---

## 📄 Licença

MIT
