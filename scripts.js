// Seleciona os elementos do formulário
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const expense = document.getElementById('expense')
const category = document.getElementById('category')
const inputs = document.querySelectorAll('input')

// Seleciona os elementos da lista
const expenseList = document.querySelector('ul')
const amountExpenses = document.querySelector('aside header p span')
const valueExpenses = document.querySelector('aside header h2')

// Captura o evento de input para formatar o valor
amount.oninput = () => {
    // Obtém o valor atual do input e remove os caracteres não numéricos
    let valueAmount = amount.value.replace(/\D+/g, '')

    // Transforma o valor em centavos
    valueAmount = Number(valueAmount) / 100

    // Atualiza o valor do input
    amount.value = formatCurrencyBRL(valueAmount)
}

// Formata o valor no padrão BRL (real brasileiro)
function formatCurrencyBRL(value) {
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

    clearInputs()
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

        updateTotais()

    } catch (error) {
        alert('Não foi possível adicionar a despesa a lista.')
        console.log(error);
    }
}

// Atualiza os totais
function updateTotais() {
    try {
        const items = expenseList.children

        amountExpenses.textContent = `${items.length} ${items.length > 1 ? 'despesas' : 'despesa'}`

        let total = 0

        for (let item = 0; item < items.length; item++) {
            const itemAmount = items[item].querySelector('.expense-amount')

            let value = itemAmount.textContent.replace(/[^\d]/g, '').replace(',', '.')

            value = parseFloat(value)

            if (isNaN(value)) {
                return alert('Não foi possível atualizar o valor total. O valor não parece ser número.')
            }

            total += Number(value) / 100
        }

        const symbolBRL = document.createElement('small')
        symbolBRL.textContent = 'R$'

        total = formatCurrencyBRL(total).replace('R$', '')

        valueExpenses.innerHTML = ''

        valueExpenses.append(symbolBRL, total)

    } catch (error) {
        console.log(error);
        alert('Não foi possível atualizar os totais.')
    }
}

// Evento que captura o evento de clique nos itens da lista
expenseList.addEventListener('click', function (event) {

    // Verifica se o elemento clicado contém a classe remove-icon
    if (event.target.classList.contains('remove-icon')) {

        // No elemento clicado procure o elemento pai li
        const item = event.target.closest('li')

        item.remove()
    }

    updateTotais()
})

function clearInputs () {
    category.value = ''

    inputs.forEach(itens => {
        itens.value = ''
    })

    expense.focus()
}