import { useState } from "react"
import { useValidation, ValidationProvider } from "."

type Data = {
  plate: string
  chassi: string
  phone: string
}

function App2() {

  const [data, setData] = useState<Data>({
    chassi: "",
    plate: "",
    phone: "",
  })

  const handlerChangeData = <T extends Data[keyof Data]>(key: keyof Data, value: T) => {
    setData(pv => ({ ...pv, [key]: value }))
  }



  return (
    <>
      <h1>HELOOOOOOOOOOOOOOOOO</h1>
      <ValidationProvider>
        {
          ({ register, trigger, errors }) =>
            <div>
              <div style={{
                marginBottom: 10
              }}>
                <p style={{
                  margin: 0
                }}>Placa</p>
                <input
                  {...register("plate", e => handlerChangeData("plate", e.target.value), {
                    required: true,
                    mask: "plate",
                    nameOptional: "Placa"
                  })}
                  style={{
                    borderWidth: 1,
                    borderColor: errors.plate ? "red" : "black",
                  }}
                  value={data.plate}
                />
                <p style={{
                  margin: 0
                }}>Erro: {errors.plate?.message}</p>
              </div>
              <div style={{
                marginBottom: 10
              }}>
                <p style={{
                  margin: 0
                }}>Nome</p>
                <input
                  {...register("chassi", e => handlerChangeData("chassi", e.target.value), {
                    required: true,
                    mask: "chassi",
                    nameOptional: "Nome"
                  })}
                  style={{
                    borderWidth: 1,
                    borderColor: errors.plate ? "red" : "black",
                  }}
                  value={data.chassi}
                />
                <p style={{
                  margin: 0
                }}>Erro: {errors.chassi?.message}</p>
              </div>
              <div style={{
                marginBottom: 10
              }}>
                <p style={{
                  margin: 0
                }}>Telefone</p>
                <input
                  {...register("phone", e => handlerChangeData("phone", e.target.value), {
                    required: true,
                    mask: "phone",
                    nameOptional: "Telefone"
                  })}
                  style={{
                    borderWidth: 1,
                    borderColor: errors.plate ? "red" : "black",
                  }}
                  value={data.phone}
                />
                <p style={{
                  margin: 0
                }}>Erro: {errors.phone?.message}</p>
              </div>
              <button onClick={() => trigger()}>
                Validar
              </button>
            </div>
        }
      </ValidationProvider>
    </>
  )
}

function PageRegister() {
  return (
    <div>

    </div>
  )
}

function PageLogin() {
  const { errors, register, trigger } = useValidation()
  const [cpf, setPhone] = useState("")
  
  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <p style={{ margin: 0 }}>CPF</p>

        {/* Registrando input */}
        <input
          {...register("cpf", e => setPhone(e.target.value), {
            required: true,
            mask: "cpf",
            nameOptional: "CPF",
            cpf: true
          })}
          style={{
            borderWidth: 1,
            borderColor: errors.cpf ? "red" : "black",
          }}
          value={cpf}
        />
        {/* Coletando mensagem de erro */}
        <p style={{ margin: 0 }}>Erro: {errors.cpf?.message}</p>
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
    <>
      <ValidationProvider>
        <PageLogin />
      </ValidationProvider>

      <PageRegister />
    </>
  )
}

export default App
