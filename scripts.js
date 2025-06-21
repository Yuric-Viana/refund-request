// Seleciona os elementos do formulário
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')

const expenseList = document.querySelector('ul')

// Captura o evento de input para formatar o valor
amount.oninput = () => {   
    // Obtém o valor atual do input e remove os caracteres não numéricos
    let valueamount = amount.value.replace(/\D+/g, '')

    // Transforma o valor em centavos
    valueamount = Number(valueamount) / 100

    // Atualiza o valor do input
    amount.value = formatCurrencyBRL(valueamount)
}

function formatCurrencyBRL(value) {
    // Formata o valor no padrão BRL (real brasileiro)
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })

    return value
}

// Captura o evento de submit do formulário para obter os valores inseridos
form.onsubmit = (event) => {
    event.preventDefault()

    // Cria um objeto com os detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date()
    }

    expenseAdd(newExpense)
}

// Adiciona um novo item na lista
function expenseAdd(newExpense) {
    try {
        const expenseItem = document.createElement('li')
        expenseItem.classList.add('expense')

        const expenseIcon = document.createElement('img')
        expenseIcon.setAttribute('src', `./img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute('alt', newExpense.category_name)

        const expenseInfo = document.createElement('div')
        expenseInfo.classList.add('expense-info')

        const expenseName = document.createElement('strong')
        expenseName.textContent = newExpense.expense

        const expenseCategory = document.createElement('span')
        expenseCategory.textContent = newExpense.category_name

        const expenseAmount = document.createElement('span')
        expenseAmount.classList.add('expense-amount')
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.replace('R$', '')}`

        const expenseDelete = document.createElement('img')
        expenseDelete.classList.add('remove-icon')
        expenseDelete.src = './img/remove.svg'
        expenseDelete.setAttribute('alt', 'remover')

        expenseInfo.append(expenseName, expenseCategory)

        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, expenseDelete)

        expenseList.append(expenseItem)

    } catch (error) {
        alert('Não foi possível adicionar a despesa a lista.')
        console.log(error);
    }
}