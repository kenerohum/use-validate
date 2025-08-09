import { useState } from "react"
import { useValidation, ValidationProvider } from "."


function Exemple() {
  const { errors, register, trigger } = useValidation()
  const [cep, setPhone] = useState("")

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <p style={{ margin: 0 }}>cep</p>

        {/* Registrando input */}
        <input
          {...register("cep", e => setPhone(e.target.value), {
            required: true,
            mask: "cep",
            nameOptional: "cep",
          })}
          style={{
            borderWidth: 1,
            borderColor: errors.cep ? "red" : "black",
          }}
          value={cep}
        />
        {/* Coletando mensagem de erro */}
        <p style={{ margin: 0 }}>Erro: {errors.cep?.message}</p>
      </div>
      {/* Validando o input MANUALMENTE*/}
      <button onClick={() => trigger()}>
        Validar
      </button>
    </div>
  )
}

function App() {
  return (
    <ValidationProvider>
      <Exemple />
    </ValidationProvider>
  )
}

export default App
