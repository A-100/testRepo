/* 
 * 
 */
window.onload = function(){
    
    $( "#accordion" ).accordion({heightStyle: "content"});
    
    /****************** DZ3-1 ******************************/
    
    var ab = document.getElementById("ab");
    var bc = document.getElementById("bc");
    var cd = document.getElementById("cd");
    var de = document.getElementById("de");
    var res = document.getElementById("travelResult");
    
    var Excursion = {};
    Excursion.abPath = parseInt(document.getElementById("abPath").innerHTML);
    Excursion.bcPath = parseInt(document.getElementById("bcPath").innerHTML);
    Excursion.cdPath = parseInt(document.getElementById("cdPath").innerHTML);
    Excursion.dePath = parseInt(document.getElementById("dePath").innerHTML);
    Excursion.GetSelectedMode = function(elem){
        var selectedMode = new Travel();
        switch(elem.value){
            case "OnFoot":
                selectedMode = new OnFoot(selectedMode);
                break;
            case "OnBoat":
                selectedMode = new OnBoat(selectedMode);
                break;
            case "OnHorseback":
                selectedMode = new OnHorseback(selectedMode);
                break;
            case "OnBalloon":
                selectedMode = new OnBalloon(selectedMode);
                break;
        }
        return selectedMode;
    };
    Excursion.GetTotal = function(){
        var abValue = Excursion.GetSelectedMode(ab).count(Excursion.abPath);
        var bcValue = Excursion.GetSelectedMode(bc).count(Excursion.bcPath);
        var cdValue = Excursion.GetSelectedMode(cd).count(Excursion.cdPath);
        var deValue = Excursion.GetSelectedMode(de).count(Excursion.dePath);
        return abValue + bcValue + cdValue + deValue;
    };
    Excursion.DisplayResult = function(){
        var total = Excursion.GetTotal();
        res.innerHTML = total;
    };
    ab.onchange = bc.onchange = cd.onchange = de.onchange = Excursion.DisplayResult;
    Excursion.DisplayResult();
    
    /****************** DZ3-2 ******************************/
    
    var x = document.getElementById("x");
    var y = document.getElementById("y");
    var op = document.getElementById("op");
    var resultElem = document.getElementById("res");
    var errorElem = document.getElementById("error");
    
    var calculator = {};
    calculator.setOperation = function(data){
        switch (op.value){
            case "addition":
                return new Addition(data);
            case "subtraction":
                return new Subtraction(data);
            case "division":
                return new Division(data);
            case "multiplication":
                return new Multiplication(data);
            case "power":
                return new Power(data);
        }
    };
    calculator.execute = function(){
        try {
            var data = new Data(x.value, y.value);
            var operation = calculator.setOperation(data);
            resultElem.value = operation.execute();
            errorElem.style.display = "none";
        }
        catch(e){
            errorElem.innerHTML = e.message;
            errorElem.style.display = "block";
        }
    };
    x.onchange = y.onchange = op.onchange = calculator.execute;
    /*
    function Calc(){
        try{
            var single = new Single(x.value, y.value);
            var singleWrap = new SingleWrapper(single);
            var result;
            switch (op.value){
                case "addition":
                    result = singleWrap.Add();
                    break;
                case "subtraction":
                    result = singleWrap.Sub();
                    break;
                case "division":
                    result = singleWrap.Div();
                    break;
                case "multiplication":
                    result = singleWrap.Multi();
                    break;
                case "power":
                    result = singleWrap.Pow();
                    break;
            }
            resultElem.value = result;
            errorElem.style.display = "none";
        }
        catch(e)
        {
            errorElem.innerHTML = e.message;
            errorElem.style.display = "block";
        }
    };
    x.onchange = y.onchange = op.onchange = Calc;
    */
};

/********************* DZ3-2 ****************************************/

//var Single = new function(){
//    var instance;
//    var number1;
//    var number2;
//    
//    function checkNumber(num){
//        if( isNaN(parseFloat(num)) )
//            throw Error( "Аргумент " + num + " не является числом." );
//    }
//    
//    function Single(num1, num2){
//        checkNumber(num1);
//        checkNumber(num2);
//        
//        if(!instance){
//            number1 = parseFloat(num1);
//            number2 = parseFloat(num2);
//            instance = this;
//        }
//        else {
//            number1 = parseFloat(num1);
//            number2 = parseFloat(num2);
//            return instance;
//        }
//    }
//    
//    Single.prototype.getFirst = function(){
//        return number1;
//    };
//    Single.prototype.getSecond = function(){
//        return number2;
//    };
//    Single.prototype.toString = function(){
//        return "Первое число: " + number1 + "; второе число: " + number2;
//    };
//
//    return Single;
//};
//
//function SingleWrapper(single){
//    this.single = single;
//}
//SingleWrapper.prototype.Add = function(){
//    return this.single.getFirst() + this.single.getSecond();
//};
//SingleWrapper.prototype.Sub = function(){
//    return this.single.getFirst() - this.single.getSecond();
//};
//SingleWrapper.prototype.Div = function(){
//    if(this.single.getSecond() === 0)
//        throw Error("Делить на нуль нельзя!");
//    return this.single.getFirst() / this.single.getSecond();
//};
//SingleWrapper.prototype.Multi = function(){
//    return this.single.getFirst() * this.single.getSecond();
//};
//SingleWrapper.prototype.Pow = function(){
//    return Math.pow(this.single.getFirst(), this.single.getSecond());
//};

var Data = new function(){
    var instance;
    var number1;
    var number2;
    
    function checkNumber(num){
        if( isNaN(parseFloat(num)) )
            throw Error( "Аргумент " + num + " не является числом." );
    }
    
    function Data(num1, num2){
        checkNumber(num1);
        checkNumber(num2);
        
        number1 = parseFloat(num1);
        number2 = parseFloat(num2);
        
        if(!instance)
            instance = this;
        else 
            return instance;
    }
    
    Data.prototype.getFirst = function(){
        return number1;
    };
    Data.prototype.getSecond = function(){
        return number2;
    };
    Data.prototype.toString = function(){
        return "Первое число: " + number1 + "; второе число: " + number2;
    };

    return Data;
};

function Operation(data){
    this.data = data;
    this.execute = function(){
        throw Error("Это метод абстрактного класса Operation, который должен быть переопределен.");
    };
}

function Addition(data)
{
    Operation.call(this, data);
    this.execute = function(){
        return this.data.getFirst() + this.data.getSecond();
    };
}
Addition.prototype = inherit(Operation.prototype);
Addition.prototype.constructor = Addition;

function Subtraction(data)
{
    Operation.call(this, data);
    this.execute = function(){
        return this.data.getFirst() - this.data.getSecond();
    };
}
Subtraction.prototype = inherit(Operation.prototype);
Subtraction.prototype.constructor = Subtraction;

function Division(data)
{
    Operation.call(this, data);
    this.execute = function(){
        if(this.data.getSecond() === 0)
            throw Error("Делить на нуль нельзя!");
        return this.data.getFirst() / this.data.getSecond();
    };
}
Division.prototype = inherit(Operation.prototype);
Division.prototype.constructor = Division;

function Multiplication(data)
{
    Operation.call(this, data);
    this.execute = function(){
        return this.data.getFirst() * this.data.getSecond();
    };
}
Multiplication.prototype = inherit(Operation.prototype);
Multiplication.prototype.constructor = Multiplication;

function Power(data)
{
    Operation.call(this, data);
    this.execute = function(){
        return Math.pow(this.data.getFirst(), this.data.getSecond());
    };
}
Power.prototype = inherit(Operation.prototype);
Power.prototype.constructor = Power;


/********************* DZ3-1 ****************************************/

function Travel(){
    this.count = function(){
        return 0;
    };
}

function OnFoot(travel){
    this.cost = 1;
    this.count = function(number){
        return travel.count() + this.cost * number;
    };
}

function OnBoat(travel){
    this.cost = 1.5;
    this.count = function(number){
        return travel.count() + this.cost * number;
    };
}

function OnHorseback(travel){
    this.cost = 2.5;
    this.count = function(number){
        return travel.count() + this.cost * number;
    };
}

function OnBalloon(travel){
    this.cost = 5;
    this.count = function(number){
        return travel.count() + this.cost * number;
    };
}


