// Seleciona os elementos do formulário
const expense = document.querySelector('#amount')

// Captura o evento de input para formatar o valor
expense.oninput = () => {   
    // Obtém o valor atual do input e remove os caracteres não numéricos
    let valueExpense = expense.value.replace(/\D+/g, '')

    // Transforma o valor em centavos
    valueExpense = Number(valueExpense) / 100

    // Atualiza o valor do input
    expense.value = formatCurrencyBRL(valueExpense)
}

function formatCurrencyBRL(value) {
    // Formata o valor no padrão BRL (real brasileiro)
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    return value
}