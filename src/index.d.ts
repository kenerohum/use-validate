// src/index.d.ts

declare module '@kenero/use-validate' {
    import React from 'react';

    interface ErrosValidation {
        [key: string]: {
            error: boolean;
            message: string;
        } | undefined | null;
    }

    export interface Options {
        cpf?: boolean;
        cnpj?: boolean;
        nameAndLastName?: boolean;
        required?: boolean;
        nameOptional?: string;
        mask?: "cpf" | "date" | "phone" | "card-number" | "card-data" | "phone" | "name" | "cpf-cnpj" | "cnpj" | "plate" | "chassi";
    }

    export type TypeRegister = <T extends HTMLInputElement | HTMLSelectElement>(
        id: string,
        onChange: (e: React.ChangeEvent<T>) => void,
        options?: Options
    ) => {
        ref: React.RefObject<T>;
        onBlur: (e: React.ChangeEvent<T>) => void;
        onChange: (e: React.ChangeEvent<T>) => void;
    };

    export interface ValidationContext {
        register: TypeRegister;
        trigger: (keys?: string[]) => boolean;
        resetErros: (keys?: string[]) => void;
        errors: ErrosValidation;
    }

    export const ValidationProvider: React.FC<{children: (data: ValidationContext) => JSX.Element}>;

    export default function useValidation(): ValidationContext;
}
