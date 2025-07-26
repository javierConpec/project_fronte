interface inputCustom {
    name:string;
    label: string;
    type?: string;
    value?: string | number;
    disabled?: boolean;
}

export interface modalCustomProps{
    isOpen: boolean;
    title: string;
    inputs: inputCustom[];
    disabled?: boolean;
    onClose: () => void;
    onSubmit: (formData: Record<string, string | number>) => void;
}