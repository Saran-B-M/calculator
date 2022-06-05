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
    operation(a, b);
}

