import { useState } from "react"
import { ValidationProvider } from "."

type Data = {
  plate: string
  chassi: string
}

function App() {

  const [data, setData] = useState<Data>({
    chassi: "",
    plate: "",
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
                }}>Chassi</p>
                <input
                  {...register("chassi", e => handlerChangeData("chassi", e.target.value), {
                    required: true,
                    mask: "chassi",
                    nameOptional: "Chassi"
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
              <button onClick={() => trigger()}>
                Validar
              </button>
            </div>
        }
      </ValidationProvider>
    </>
  )
}

export default App
