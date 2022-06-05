//Add function for addition, subtraction, multiplication and division.

//Create function that takes 2 arguments for each operation and return the 
//result
function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a*b;
}

function divide(a, b){
    return a/b;
}

//Create a function operate that takes 2 numbers and a operation and then calls
//the operation on the numbers
function operate(a, b, operation){
    switch(operation){
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
    }
}

//Add event listener to all buttons that does appropriate operation for each
//button

//Loop through all buttons and add event listener
//from the event passed by the event listener call appropriate functions through
//the data-number attribute
//If numbers are pressed populate the numbers in the display and also store it 
//for operating
//Store the value if the user presses a operation and also store the operand 
//when the user presses the equal to button store the 2nd operand and show the 
//result
const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

buttons.forEach(button=> 
    button.addEventListener("click", e => {
        let data = e.target.dataset.number;
        if(data==="="){
            infixToPostfix(display.textContent);
            return
        }
        else if(data === "clear") {
            display.textContent = "";
            return
        }
        display.textContent += data;
        })
        
)

//After equal to button is pressed convert the infix expression into postfix 
//expression and evaluate it

//Create a function named infixToPostfix that does the conversion
function infixToPostfix(expr){
//split the expression into a list
    expr = expr.trim();
    let inputList = [];
    let number = ""
    for (let i=0; i<expr.length; i++){
        if(expr[i] == "+" || expr[i] == "-" || expr[i] == "*" || expr[i] == "/"||
        expr[i] == "(" || expr[i] == ")"){
            inputList.push(number);
            number = "";
            inputList.push(expr[i]);
        }
        else number += expr[i];
    }
    inputList.push(number);

    inputList = inputList.filter(ele => ele!="");
    
//Create a empty output list and add operands operators in it according to the 
//precedence
    let postfix = [];
//Create an empty stack
    let stack = [];
//create a object that maps each operator with a precedence value
//left parenthesis will have lowest priority as it should'nt be popped when 
//comparing with an operator
    let precedenceValue = {
        '*': 2, 
        '/': 2,
        '+': 1,
        '-': 1,
        '(': 0,
    }
    console.log(inputList);
    for(let element in inputList){
//if the element is number push it into the output list
//if the element is a left parenthesis push it into the stack
//if the element is a right parenthesis pop all the elements in the stack and
//push it into the output list until a matching left parenthesis is found 
//if the element is an operator first check if the elements at the top has 
//higher precedence over the operator if so push those elements to the output 
//list before pushing the operator to the stack
        if (inputList[element]==="(") stack.push(inputList[element]);
        else if (inputList[element]===")") {
            while(stack[stack.length-1] && stack[stack.length-1]!=="("){
                postfix.push(stack.pop());
            }
            stack.pop();
        }
        else if (inputList[element] == "+" || inputList[element] == "-" || 
            inputList[element] == "*" || inputList[element] == "/"){
            while(stack[stack.length-1] && precedenceValue[inputList[element]] <= precedenceValue[stack[stack.length-1]] ){
                postfix.push(stack.pop())
            }
            stack.push(inputList[element]);
        }
        else postfix.push(+inputList[element]);
    }
    let stackElement = stack.pop();
    while(stackElement){
        postfix.push(stackElement);
        stackElement = stack.pop();

    }
    console.log(postfix);
//for each elements in postfix 
//if its a number push to stack
//if its a operand pop 2 elements from stack and do the operation with first one
//as operand2 and 2nd as operand1
    for(let i=0; i<postfix.length; i++){
        if(Number.isFinite(postfix[i])) stack.push(postfix[i]);
        else{
            let operand2 = stack.pop();
            let operand1 = stack.pop();
            stack.push(operate(operand1, operand2, postfix[i]));
        }
    }

    let result = Math.round(stack.pop()*100)/100;
    let displayContent;

    if(Number.isFinite(result)){
        displayContent = result;
    }
    else if(result==Infinity){
        displayContent = "Never Settle!";
    }
    else displayContent = "Invalid Input";

    display.textContent = displayContent;

}





