// Seleciona os elementos do formulário
const expense = document.querySelector('#amount')

// Captura o evento de input para formatar o valor
expense.oninput = () => {   
    // Obtém o valor atual do input e remove os caracteres não numéricos
    let valueExpense = expense.value.replace(/\D+/g, '')

    // Atualiza o valor do input
    expense.value = valueExpense
}