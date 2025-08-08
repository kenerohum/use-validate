'use client';

import React, { createContext, useState, useContext, useRef, forwardRef } from 'react';

interface ErrosValidation {
    [key: string]: {
        error: boolean
        message: string
    } | undefined | null;
}

interface Options {
    cpf?: boolean
    cnpj?: boolean
    nameAndLastName?: boolean
    required?: boolean
    nameOptional?: string
    minLength?: number
    mask?: "cpf" | "date" | "phone" | "card-number" | "card-data" | "phone" | "name" | "cpf-cnpj" | "cnpj" | "plate" | "chassi"
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

interface ValidationProviderProps {
    children: (data: ValidationContext) => JSX.Element ;
}

interface ValidationProviderElementProps {
    children: React.ReactNode;
}

interface ValidationContext {
    register: TypeRegister;
    trigger: (keys?: string[]) => boolean;
    resetErros: (keys?: string[]) => void;
    errors: ErrosValidation;
}

const ValidationContext = createContext<ValidationContext>({
    register: () => ({
        ref: { current: null },
        onBlur: () => { },
        onChange: () => { }
    }),
    trigger: () => true,
    resetErros: () => { },
    errors: {} as ErrosValidation
});


const MASK: { [key: string]: (value: string) => string } = {
    cpf: (value: string): string => {
        const numericValue = value.replace(/\D/g, ''); // Remove caracteres não numéricos

        // Divide o valor em três partes usando grupos de regex
        let part1 = '';
        let part2 = '';
        let part3 = '';
        let part4 = '';

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
    "cpf-cnpj": (value: string): string => {
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
    cnpj: (value: string): string => {
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
    name: (value: string): string => {

        const palavras = value.split(' ').map((palavra) => {
            // Aplica a transformação somente se a palavra tem 3 ou mais caracteres
            if (palavra.length >= 3) {
                return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
            }
            return palavra;
        });

        // Junta as palavras transformadas de volta em uma string, preservando espaços originais
        const nomeTransformado = palavras.join(' ');
        return nomeTransformado;
    },
    "card-number": (cardNumber: string): string => {
        // Remove caracteres não numéricos para padronizar a entrada
        const sanitized = cardNumber.replace(/\D/g, '');

        // Divide o número em grupos de 4 dígitos
        return sanitized.replace(/(\d{4})/g, '$1 ').trim();
    },
    "card-data": (date: string): string => {
        // Remove caracteres não numéricos para padronizar a entrada
        const sanitized = date.replace(/\D/g, '');

        // Formata a data como 'AA/MM'
        return sanitized.replace(/(\d{2})(\d{2})/, '$1/$2');
    },
    phone: (value: string): string => {
        // Remove todos os caracteres não numéricos
        const numbers = value.replace(/[^\d]/g, '');
        if (value.length >= 16) return value.slice(0, 16)
        // Aplica a máscara do telefone
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
    chassi: (value: string) => {
        // Remove caracteres inválidos e mantém apenas letras e números, excluindo I, O e Q
        value = value.replace(/[^A-HJ-NPR-Z0-9]/gi, '').toUpperCase();

        // Adiciona a máscara de chassi
        if (value.length > 5 && value.length <= 10) {
            return `${value.slice(0, 5)}-${value.slice(5)}`;
        } else if (value.length > 10 && value.length <= 15) {
            return `${value.slice(0, 5)}-${value.slice(5, 10)}-${value.slice(10)}`;
        } else if (value.length > 15) {
            return `${value.slice(0, 5)}-${value.slice(5, 10)}-${value.slice(10, 15)}-${value.slice(15, 17)}`;
        }

        return value;
    },
    plate: (value: string) => {
        // Remove caracteres que não sejam letras e números
        value = value.replace(/[^A-Z0-9]/gi, '').toUpperCase();

        // Verifica o comprimento e aplica a máscara adequada
        if (value.length <= 3) {
            return value;
        } else if (value.length <= 7) {
            // Formato antigo AAA-1234
            return `${value.slice(0, 3)}-${value.slice(3, 7)}`;
        } else {
            // Formato Mercosul AAA1A23
            return `${value.slice(0, 3)}-${value.slice(3, 7)}`;
        }
    }
};

const DEFAULT_PROPS: { [key: string]: Options } = {
    plate: {
        mask: 'plate',
        minLength: 8
    },
    chassi: {
        mask: 'chassi',
        minLength: 20
    }
}

const MESSAGES = {
    required: "é obrigatório.",
    cpf: "está incorreto.",
    cnpj: "está incorreto.",
    nameAndLastName: "digite seu nome completo.",
    minLength: "deve ter no mínimo {minLength} caracteres.",
}

const ValidationProvider = forwardRef<ValidationContext | undefined, ValidationProviderProps | ValidationProviderElementProps>(
    ({ children }, ref) => {
        const inputRefs = useRef<{ [key: string]: React.RefObject<HTMLInputElement | HTMLSelectElement> }>({});
        const refOptions = useRef<{ [key: string]: Options | undefined }>({});

        const [errors, setErrors] = useState<ErrosValidation>({});

        const message = (key: string, errorType: keyof typeof MESSAGES) => {
            const currentInputOptions = refOptions.current[key]
            const msg = MESSAGES[errorType].replace("{minLength}", String(currentInputOptions?.minLength));

            return `${capitalizeFirstLetter(currentInputOptions?.nameOptional || key)} ${msg}`
        }

        const register = <T extends HTMLInputElement | HTMLSelectElement>(id: string, onChange: (e: React.ChangeEvent<T>) => void, options: Options = { required: true }): {
            ref: React.RefObject<T>;
            onBlur: (e: React.ChangeEvent<T>) => void;
            onChange: (e: React.ChangeEvent<T>) => void;
        } => {
            const inputRef = React.createRef<T>();
            inputRefs.current[id] = inputRef;

            const defaultOptions = options.mask ? { ...DEFAULT_PROPS[options.mask] } : {}

            refOptions.current[id] = { ...defaultOptions, ...options }
            return {
                ref: inputRef,
                onBlur: (e: React.ChangeEvent<T>) => {
                    if (options?.required && e) {
                        //validationAll(id, e.target.value)
                        trigger([id])
                    }
                },
                onChange: (e: React.ChangeEvent<T>) => {
                    if (options?.required) {
                        //validationAll(id, e.target.value)
                        trigger([id])
                    }
                    if (options?.mask) {
                        e.target.value = MASK[options?.mask](e.target.value)
                    }
                    onChange(e);
                }
            };
        };

        const trigger = (keys?: string[]) => {
            let isValid = true;
            const newErrors: ErrosValidation = { ...errors };


            if (!keys) {
                keys = Object.keys(inputRefs.current)
            }

            keys.forEach(key => {
                const currentInputOptions = refOptions.current[key]
                const currentInputRef = inputRefs.current[key]?.current

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
                            }
                            isValid = false;
                        }
                    }
                }

            });

            setErrors(newErrors);
            return isValid;
        };

        function validaCPF(cpf: string): boolean {
            cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

            if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
                return false;
            }

            let soma = 0;
            let resto: number;

            for (let i = 1; i <= 9; i++) {
                soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
            }

            resto = (soma * 10) % 11;

            if ((resto === 10) || (resto === 11)) {
                resto = 0;
            }

            if (resto !== parseInt(cpf.substring(9, 10))) {
                return false;
            }

            soma = 0;

            for (let i = 1; i <= 10; i++) {
                soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
            }

            resto = (soma * 10) % 11;

            if ((resto === 10) || (resto === 11)) {
                resto = 0;
            }

            return resto === parseInt(cpf.substring(10, 11));
        }

        function validaNameAndLastName(nomeCompleto: string): boolean {
            // Divide a string em partes correspondentes ao nome e sobrenome
            const partesNome = nomeCompleto.trim().split(" ");

            // Verifica se há pelo menos duas partes (nome e sobrenome)
            if (partesNome.length >= 2 && partesNome[0].length >= 3) {
                return true; // Nome e sobrenome válidos
            } else {
                return false; // Nome ou sobrenome está faltando
            }
        }

        function capitalizeFirstLetter(string: string) {
            if (string && string.length > 0) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            } else {
                return string;
            }
        }

        const resetErros = (keys?: string[]) => {
            const newErrors: ErrosValidation = { ...errors };

            if (!keys) {
                keys = Object.keys(inputRefs.current)
            }

            keys.forEach(key => {

                newErrors[key] = null
            });

            setErrors(newErrors);
        };

        // Usando `ref` para expor os métodos
        if (typeof ref === 'function') {
            ref({ register, errors, trigger, resetErros });
        } else if (ref) {
            ref.current = { register, errors, trigger, resetErros };
        }

        return (
            <ValidationContext.Provider value={{ register, errors, trigger, resetErros }}>
                {typeof children != 'function' ? children : children({ register, errors, trigger, resetErros })}
            </ValidationContext.Provider>
        );
    });

const useValidation = () => useContext(ValidationContext)

// dist/index.d.ts

export type { ErrosValidation, Options, TypeRegister, ValidationContext };
export { ValidationProvider, useValidation };


