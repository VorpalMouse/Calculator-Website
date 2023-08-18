let runningTotal = 0;
let buffer = "0";
let operator;
let leftNumber = 0;
let rightNumber = 0;
let firstCalculation = true;

const screen = document.querySelector('.screen');

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value);
    }else if (!isNaN(value)&&((firstCalculation)||(operator))){
        handleNumber(value);
    }
    else{
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            runningTotal=0;
            leftNumber=0;
            rightNumber=0;
            operator=null;
            firstCalculation=true;
            break;
        case '=':
            if (operator === null){
                return;
            }
            else{
                buffer = Math.round(handleMath());
                leftNumber=parseInt(buffer);
                rightNumber=0;
                operator=null;
                firstCalculation=false;
            }
            break;
        case '←':
            if (buffer.slice(-1) === ' '){
                buffer = buffer.substring(0, buffer.length-3);
                operator=null;
            }
            else{
            buffer = buffer.substring(0, buffer.length-1);
            }
            if (!buffer){
                buffer='0';
            }
            break;
        case '−':
        case '×':
        case '÷':
        case '+':
            if (!operator){
                operator=symbol;
                buffer += ' '+symbol+' ';
            }
            break;
    }   
}

function handleNumber(numberString){
    if(buffer === '0'){
        buffer =numberString;
        return;
    }
    else{
        buffer += numberString;
    }
    if (!operator){
        leftNumber*=10;
        leftNumber+=parseInt(numberString);
    }
    else{
        rightNumber*=10;
        rightNumber+=parseInt(numberString);
    }
    
}

function handleMath(){
    switch(operator){
        case '−':
            return leftNumber - rightNumber;
        case '×':
            return leftNumber * rightNumber;
        case '÷':
            return leftNumber / rightNumber;
        case '+':
            return leftNumber + rightNumber;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){buttonClick(event.target.innerText);})
}

init();