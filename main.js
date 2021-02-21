class Calculator{
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1); /* I left the last character behind */
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString(); 
        /* I use string because i need to append, not to sum */
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return; /* if there is not a value operand do nothing */
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.currentOperand = this.currentOperand.toString() + operation.toString();
        this.previousOperand = this.currentOperand; 
        this.currentOperand = '';
    }
    
    compute(){
        let result;
        const prev = parseFloat(this.previousOperand); /* Set tu numbers*/
        const current = parseFloat(this.currentOperand);
        if( isNaN(prev) || isNaN(current) ) return; /* if the arguments are not numbers or are empty */
        switch (this.operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if( current !== 0 ){
                    result = prev / current;
                    break;
                }
            default:
                return;
        }
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = '';
    }

    updateDisplay(){
        this.currentOperandText.innerText = this.currentOperand;
        this.previousOperandText.innerText = this.previousOperand;
    }

}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandText = document.querySelector('[data-previous-operand]');
const currentOperandText = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(button => {
    button.addEventListener('click', any =>{
        calculator.appendNumber(button.innerText) /*add the value/number of the button selected */
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', any => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})

equalButton.addEventListener('click', button =>{
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});