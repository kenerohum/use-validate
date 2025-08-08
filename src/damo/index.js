"use client";

// src/index.tsx
import React, { createContext, useState, useContext, useRef, forwardRef } from "react";
import { jsx } from "react/jsx-runtime";
var ValidationContext = createContext({
  register: () => ({
    ref: { current: null },
    onBlur: () => {
    },
    onChange: () => {
    }
  }),
  trigger: () => true,
  resetErros: () => {
  },
  errors: {}
});
var MASK = {
  cpf: (value) => {
    const numericValue = value.replace(/\D/g, "");
    let part1 = "";
    let part2 = "";
    let part3 = "";
    let part4 = "";
    if (numericValue.length > 9) {
      part1 = numericValue.substring(0, 3);
      part2 = numericValue.substring(3, 6);
      part3 = numericValue.substring(6, 9);
      part4 = numericValue.substring(9, 11);
      return `${part1}.${part2}.${part3}-${part4}`;
    } else if (numericValue.length > 6) {
      part1 = numericValue.substring(0, 3);
      part2 = numericValue.substring(3, 6);
      part3 = numericValue.substring(6, 9);
      return `${part1}.${part2}.${part3}`;
    } else if (numericValue.length > 3) {
      part1 = numericValue.substring(0, 3);
      part2 = numericValue.substring(3, 6);
      return `${part1}.${part2}`;
    } else {
      return numericValue;
    }
  },
  "cpf-cnpj": (value) => {
    value = value.replace(/\D/g, "");
    if (value.length > 14) {
      value = value.substring(0, 14);
    }
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d)/, "$1.$2");
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      value = value.replace(/^(\d{2})(\d)/, "$1.$2");
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
      value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
      value = value.replace(/(\d{4})(\d)/, "$1-$2");
    }
    return value;
  },
  cnpj: (value) => {
    value = value.replace(/\D/g, "");
    if (value.length > 14) {
      value = value.substring(0, 14);
    }
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
    return value;
  },
  name: (value) => {
    const palavras = value.split(" ").map((palavra) => {
      if (palavra.length >= 3) {
        return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
      }
      return palavra;
    });
    const nomeTransformado = palavras.join(" ");
    return nomeTransformado;
  },
  "card-number": (cardNumber) => {
    const sanitized = cardNumber.replace(/\D/g, "");
    return sanitized.replace(/(\d{4})/g, "$1 ").trim();
  },
  "card-data": (date) => {
    const sanitized = date.replace(/\D/g, "");
    return sanitized.replace(/(\d{2})(\d{2})/, "$1/$2");
  },
  phone: (value) => {
    const numbers = value.replace(/[^\d]/g, "");
    if (value.length >= 16) return value.slice(0, 16);
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 3) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  },
  chassi: (value) => {
    value = value.replace(/[^A-HJ-NPR-Z0-9]/gi, "").toUpperCase();
    if (value.length > 5 && value.length <= 10) {
      return `${value.slice(0, 5)}-${value.slice(5)}`;
    } else if (value.length > 10 && value.length <= 15) {
      return `${value.slice(0, 5)}-${value.slice(5, 10)}-${value.slice(10)}`;
    } else if (value.length > 15) {
      return `${value.slice(0, 5)}-${value.slice(5, 10)}-${value.slice(10, 15)}-${value.slice(15, 17)}`;
    }
    return value;
  },
  plate: (value) => {
    value = value.replace(/[^A-Z0-9]/gi, "").toUpperCase();
    if (value.length <= 3) {
      return value;
    } else if (value.length <= 7) {
      return `${value.slice(0, 3)}-${value.slice(3, 7)}`;
    } else {
      return `${value.slice(0, 3)}-${value.slice(3, 7)}`;
    }
  }
};
var DEFAULT_PROPS = {
  plate: {
    mask: "plate",
    minLength: 8
  },
  chassi: {
    mask: "chassi",
    minLength: 20
  }
};
var MESSAGES = {
  required: "\xE9 obrigat\xF3rio.",
  cpf: "est\xE1 incorreto.",
  cnpj: "est\xE1 incorreto.",
  nameAndLastName: "digite seu nome completo.",
  minLength: "deve ter no m\xEDnimo {minLength} caracteres."
};
var ValidationProvider = forwardRef(
  ({ children }, ref) => {
    const inputRefs = useRef({});
    const refOptions = useRef({});
    const [errors, setErrors] = useState({});
    const message = (key, errorType) => {
      const currentInputOptions = refOptions.current[key];
      const msg = MESSAGES[errorType].replace("{minLength}", String(currentInputOptions?.minLength));
      return `${capitalizeFirstLetter(currentInputOptions?.nameOptional || key)} ${msg}`;
    };
    const register = (id, onChange, options = { required: true }) => {
      const inputRef = React.createRef();
      inputRefs.current[id] = inputRef;
      const defaultOptions = options.mask ? { ...DEFAULT_PROPS[options.mask] } : {};
      refOptions.current[id] = { ...defaultOptions, ...options };
      return {
        ref: inputRef,
        onBlur: (e) => {
          if (options?.required && e) {
            trigger([id]);
          }
        },
        onChange: (e) => {
          if (options?.required) {
            trigger([id]);
          }
          if (options?.mask) {
            e.target.value = MASK[options?.mask](e.target.value);
          }
          onChange(e);
        }
      };
    };
    const trigger = (keys) => {
      let isValid = true;
      const newErrors = { ...errors };
      if (!keys) {
        keys = Object.keys(inputRefs.current);
      }
      keys.forEach((key) => {
        const currentInputOptions = refOptions.current[key];
        const currentInputRef = inputRefs.current[key]?.current;
        if (currentInputRef) {
          const value = currentInputRef?.value;
          if (!value) {
            newErrors[key] = {
              error: true,
              message: message(key, "required")
            };
            isValid = false;
          }
          if (currentInputOptions?.cpf) {
            if (value && !validaCPF(value)) {
              newErrors[key] = {
                error: true,
                message: message(key, "cpf")
              };
              isValid = false;
            }
          }
          if (currentInputOptions?.cnpj) {
            if (value && value.length < 18) {
              newErrors[key] = {
                error: true,
                message: message(key, "cnpj")
              };
              isValid = false;
            }
          }
          if (currentInputOptions?.nameAndLastName) {
            if (value && !validaNameAndLastName(value)) {
              newErrors[key] = {
                error: true,
                message: message(key, "nameAndLastName")
              };
              isValid = false;
            }
          }
          if (currentInputOptions?.minLength) {
            if (value.length < currentInputOptions?.minLength) {
              newErrors[key] = {
                error: true,
                message: message(key, "minLength")
              };
              isValid = false;
            }
          }
        }
      });
      setErrors(newErrors);
      return isValid;
    };
    function validaCPF(cpf) {
      cpf = cpf.replace(/\D/g, "");
      if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
      }
      let soma = 0;
      let resto;
      for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
      }
      resto = soma * 10 % 11;
      if (resto === 10 || resto === 11) {
        resto = 0;
      }
      if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
      }
      soma = 0;
      for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
      }
      resto = soma * 10 % 11;
      if (resto === 10 || resto === 11) {
        resto = 0;
      }
      return resto === parseInt(cpf.substring(10, 11));
    }
    function validaNameAndLastName(nomeCompleto) {
      const partesNome = nomeCompleto.trim().split(" ");
      if (partesNome.length >= 2 && partesNome[0].length >= 3) {
        return true;
      } else {
        return false;
      }
    }
    function capitalizeFirstLetter(string) {
      if (string && string.length > 0) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      } else {
        return string;
      }
    }
    const resetErros = (keys) => {
      const newErrors = { ...errors };
      if (!keys) {
        keys = Object.keys(inputRefs.current);
      }
      keys.forEach((key) => {
        newErrors[key] = null;
      });
      setErrors(newErrors);
    };
    if (typeof ref === "function") {
      ref({ register, errors, trigger, resetErros });
    } else if (ref) {
      ref.current = { register, errors, trigger, resetErros };
    }
    return /* @__PURE__ */ jsx(ValidationContext.Provider, { value: { register, errors, trigger, resetErros }, children: typeof children != "function" ? children : children({ register, errors, trigger, resetErros }) });
  }
);
var useValidation = () => useContext(ValidationContext);
export {
  ValidationProvider,
  useValidation
};
//# sourceMappingURL=index.js.map