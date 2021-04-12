import { useState } from 'react';

export const useFinInput = (initialValues) => {
    const [values, setValues] = useState(initialValues);

    return [values, e => {
        setValues({
            ...values,
            [e.target.name]: parseInt(e.target.value)
        })
    }]
}