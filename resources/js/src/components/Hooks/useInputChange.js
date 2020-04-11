import { useState } from 'react'

export const useInputChange = (selected = '') => {
    const [input, setInput] = useState(selected)

    const handleInputChange = (value) => setInput(value.target.value)

    return [input, handleInputChange]
}
