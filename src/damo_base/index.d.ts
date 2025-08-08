import { default as React } from 'react';
interface ErrosValidation {
    [key: string]: {
        error: boolean;
        message: string;
    } | undefined | null;
}
interface Options {
    cpf?: boolean;
    cnpj?: boolean;
    nameAndLastName?: boolean;
    required?: boolean;
    nameOptional?: string;
    mask?: "cpf" | "date" | "phone" | "card-number" | "card-data" | "phone" | "name" | "cpf-cnpj" | "cnpj" | "plate" | "chassi";
}
type TypeRegister = <T extends HTMLInputElement | HTMLSelectElement>(id: string, onChange: (e: React.ChangeEvent<T>) => void, options?: Options) => {
    ref: React.RefObject<T>;
    onBlur: (e: React.ChangeEvent<T>) => void;
    onChange: (e: React.ChangeEvent<T>) => void;
};
interface ValidationContext {
    register: TypeRegister;
    trigger: (keys?: string[]) => boolean;
    resetErros: (keys?: string[]) => void;
    errors: ErrosValidation;
}
declare const ValidationContext: React.Context<ValidationContext>;
interface ValidationProviderProps {
    children: (data: ValidationContext) => JSX.Element;
}
declare const ValidationProvider: React.ForwardRefExoticComponent<ValidationProviderProps & React.RefAttributes<ValidationContext | undefined>>;
declare const useValidation: () => ValidationContext;
export type { ErrosValidation, Options, TypeRegister, ValidationContext };
export { ValidationProvider, useValidation };
