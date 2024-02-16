// Verificação de números

const inputs = document.querySelectorAll(".calculator-input")

const allowedKeys = ["9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "."];


inputs.forEach(input => {
    input.addEventListener("keydown", function (ev) {
        if (input.id === 'people_input' && allowedKeys.includes(".") && ev.key === ".") {
            ev.preventDefault();
            allowedKeys.splice(allowedKeys.indexOf("."), 1);
        }

        if (ev.key === "Backspace" || allowedKeys.includes(ev.key)) {
            return;
        }

        ev.preventDefault();
    });

    // Input para atualizar o valor
    input.addEventListener("input", function () {
        
        if (input.id === "people_input" && allowedKeys.includes(".")) {
            cleanedValue = cleanedValue.replace(".", "");
            allowedKeys.splice(allowedKeys.indexOf("."), 1);
        }

        // Atualizando o valor e fazendo o calculo
        input.value = cleanedValue;
        billValue = parseFloat(billInput.value) || 0.0;
        billInput.value = billValue.toFixed(2);

        calculateTipAmount();
    });
});

// Adquirindo elementos

let billValue = 0
let percentageValue = 0
let peopleNum = 1

const billInput = document.getElementById("bill_input")
const peopleInput = document.getElementById("people_input")
const percentageBtn = document.querySelectorAll(".btn")
const customBtn = document.getElementById("custom_value")

const resetBtn = document.getElementById("reset_btn")

const tipAmountTotal = document.getElementById("amount_id")
const tipTotal = document.getElementById("total_id")


tipAmountTotal.innerHTML = "$" + (0.0).toFixed(2);
tipTotal.innerHTML = "$" + (0.0).toFixed(2);


billInput.addEventListener('input', billHandle);

peopleInput.addEventListener('input', numberOfPeopleHandle);

percentageBtn.forEach((btn) => {
    btn.addEventListener("click", percentageBtnHandle)
})

customBtn.addEventListener('input', percentCustomHandle);

resetBtn.addEventListener('click', resetBtnHandle);

function billHandle() {
    billValue = parseFloat(billInput.value)
    calculateTipAmount();
}

function numberOfPeopleHandle() {
    peopleNum = peopleInput.value;
    calculateTipAmount();
}

function percentageBtnHandle(ev) {
    ev.preventDefault()

    let percentage = ev.target.innerHTML.replace("%", "")
    percentageValue = percentage / 100
    calculateTipAmount()
}

function percentCustomHandle() {
    let percent = customBtn.value;
    if (percent < 1 || percent > 100) {
        percentageValue = 1;
        calculateTipAmount();
    } else {
        percentageValue = percent / 100;
        calculateTipAmount();
    }
}

function resetBtnHandle() {
    billInput.value = '';
    peopleInput.value = '';
    percentageBtn.forEach(elem => elem.value = '');
    customBtn.value = '';
    tipAmountTotal.innerHTML = '$' + (0.0).toFixed(2);
    tipTotal.innerHTML = '$' + (0.0).toFixed(2);
}

function calculateTipAmount() {
    if (peopleNum >= 1) {
        let tipAmountResult = (billValue * percentageValue) / peopleNum;
        let tipAmountPerPerson = (billValue / peopleNum) + tipAmountResult

        if (isNaN(tipAmountResult) && isNaN(totalPerPerson)) {
            tipAmountTotal.innerHTML = '$' + (0.0).toFixed(2);
            tipTotal.innerHTML = '$' + (0.0).toFixed(2);
        } else {
            tipAmountTotal.innerHTML = '$' + (tipAmountResult).toFixed(2);
            tipTotal.innerHTML = '$' + (tipAmountPerPerson).toFixed(2);
        }
        
    }
}

