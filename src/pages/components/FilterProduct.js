import React from 'react'

const FilterProduct = () => {
    return (
        <div>
            <button>Adcionar Produto</button>
            <label>
                Nome:
                <input type="text" />
            </label>
            <label>
                Referência
                <input type="text" />
            </label>
            <label>
                Fabricante:
                <input type="text" />
            </label>
        </div>
    )
}

export default FilterProduct