/* 
 * 
 */

window.onload = function() {
    $( "#accordion" ).accordion({heightStyle: "content"});
//    $( "#accordion h3" ).last().click();
    
    /****************** DZ2-1 ******************************/
    
    var x = document.getElementById("x");
    var y = document.getElementById("y");
    var op = document.getElementById("op");
    var res = document.getElementById("res");
    var errorElem$ = $("<div id='error'></div>");
    errorElem$.css("display", "block");

    var calculator = {};
    calculator.getOperation = function(){
        switch (op.value){
            case "addition":
                return new Addition(x.value, y.value);
                break;
            case "subtraction":
                return new Subtraction(x.value, y.value);
                break;
            case "division":
                return new Division(x.value, y.value);
                break;
            case "multiplication":
                return new Multiplication(x.value, y.value);
                break;
        }
    };
    calculator.execute = function(){
        try{
            calculator.operation = calculator.getOperation();
            res.value = calculator.operation.execute();
            errorElem$.remove();
        }
        catch(e)
        {
            errorElem$.text(e.message);
            errorElem$.appendTo("#calc");
        }
    };
    x.onchange = y.onchange = op.onchange = calculator.execute;
    
    /****************** DZ2-2 ******************************/
    
    var age = $( "#age" ), name = $( "#name" ), surname = $( "#surname" ),
    email = $( "#email" ), password = $( "#password" ), tips = $( ".validateTips" );
    
    function updateTips( text ) {
        tips.text( text ).addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1000 );
        }, 500 );
    }
    
    function showUser(user){
        $( "#user" ).text(user);
    }
    var user = new User("Иван", "Петров", 35, "ivan@example.com", "sfs558");
    showUser(user);
    
    $( "#dialog-form" ).dialog({
        autoOpen: false,
        modal: true,
        close: function() {
            $( [] ).add( age ).add( name ).add( surname ).add( email ).add( password ).val("");
        }
    });
    
    $( "#create-user" ).click(function() {
        tips.text( "Все поля должны быть заполнены." );
        $( "#dialog-form" ).dialog({
            title: "Создание пользователя",
            buttons: {
                "Добавить пользователя": function() {
                    try{
                        var user1 = new User(name.val(), surname.val(), parseInt(age.val()), email.val(), password.val());
                        if(user === user1)
                            throw Error("Не удалось создать нового пользователя");
                        else showUser(user1);
                        
                        $( this ).dialog( "close" );
                    }
                    catch(e){
                        updateTips( e.message );
                    }
                },
                "Отмена": function() {
                    $( this ).dialog( "close" );
                }
            }
        }).dialog( "open" );
    });
    $( "#update-user" ).click(function() {
        tips.text( "Все поля должны быть заполнены." );
        name.val(user.name);
        surname.val(user.surname);
        age.val(user.age);
        email.val(user.email);
        password.val(user.password);
        $( "#dialog-form" ).dialog({
            title: "Обновление данных пользователя",
            buttons: {
                "Сохранить изменения": function() {
                    try{
                        user.setName(name.val());
                        user.setSurname(surname.val());
                        user.setAge(parseInt(age.val()));
                        user.setEmail(email.val());
                        user.setPassword(password.val());
                        showUser(user);
                        $( this ).dialog( "close" );
                    }
                    catch(e){
                        updateTips( e.message );
                    }
                },
                "Отмена": function() {
                    $( this ).dialog( "close" );
                }
            }
        }).dialog( "open" );
    });
};

/********************* DZ2-1 ****************************************/
/*
 * 
 * @param {string} x
 * @param {string} y
 * @returns {Operation}
 */
function Operation(x, y){
    var xVal = parseFloat(x);
    var yVal = parseFloat(y);
    if(isNaN(xVal)) 
        throw Error("Установлено некорректное значение: " + x);
    if(isNaN(yVal)) 
        throw Error("Установлено некорректное значение: " + y);
    
    this.x = xVal;
    this.y = yVal;
    this.execute = function(){};
}

function Addition(x, y)
{
    Operation.call(this, x, y);
    this.execute = function(){
        return this.x + this.y;
    };
}
Addition.prototype = inherit(Operation.prototype);
Addition.prototype.constructor = Addition;

function Subtraction(x, y)
{
    Operation.call(this, x, y);
    this.execute = function(){
        return this.x - this.y;
    };
}
Subtraction.prototype = inherit(Operation.prototype);
Subtraction.prototype.constructor = Subtraction;

function Division(x, y)
{
    Operation.call(this, x, y);
    this.execute = function(){
        if(this.y === 0)
            throw Error("Делить на нуль нельзя!");
        return this.x / this.y;
    };
}
Division.prototype = inherit(Operation.prototype);
Division.prototype.constructor = Division;

function Multiplication(x, y)
{
    Operation.call(this, x, y);
    this.execute = function(){
        return this.x * this.y;
    };
}
Multiplication.prototype = inherit(Operation.prototype);
Multiplication.prototype.constructor = Multiplication;


/********************** DZ2-2 *****************************/

var User = new function() {
    var instance;
    
    // Приватные методы и свойства
    var id = 0;
    var minAge = 15;
    var maxAge = 120;
    var minLengthName = 3;
    var maxLengthName = 20;
    var minLengthSurname = 2;
    var maxLengthSurname = 30;
    var minLengthPassword = 3;
    var maxLengthPassword = 15;
        
    function checkLength( elem, min, max ){
        if ( elem.length < min || elem.length > max )
            return false;
        else return true;
    }
    
    function checkRegexp( elem, regexp ) {
        if ( regexp.test( elem ) ) 
            return true;
        else return false;
    }
    
    function checkName( name ) {
        if(!checkLength( name, minLengthName, maxLengthName ))
            throw Error( "Длина имени пользователя должна быть в диапазоне от " + minLengthName + " до " + maxLengthName);
        if(!checkRegexp( name, /^[a-zA-ZА-Яа-я]([0-9a-zA-ZА-Яа-я_])+$/i ))
            throw Error("Имя пользователя может состоять только из символов 0-9 a-z A-Z А-Я а-я _ и начинаться с буквы.");
    }
    
    function checkSurname( surname ) {
        if(!checkLength( surname, minLengthSurname, maxLengthSurname ))
            throw Error( "Длина фамилии пользователя должна быть в диапазоне от " + minLengthSurname + " до " + maxLengthSurname);
        if(!checkRegexp( surname, /^[a-zA-ZА-Яа-я]([a-zA-ZА-Яа-я_])+$/i ))
            throw Error("Фамилия пользователя может состоять только из символов a-z A-Z А-Я а-я.");
    }
    
    function checkAge( age ) {
        if( isNaN(age) )
            throw Error( "Некорректно указан возраст пользователя");
        if(age < minAge || age > maxAge)
            throw Error( "Возраст пользователя должен быть в диапазоне от " + minAge + " до " + maxAge);
    }
    
    function checkEmail( email ) {
        if(
            !checkRegexp(email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i)
        )
            throw Error( "Некорректный Email" );
    }
    
    function checkPassword( password ) {
        if(!checkLength( password, minLengthPassword, maxLengthPassword ))
            throw Error( "Длина пароля пользователя должна быть в диапазоне от " + minLengthPassword + " до " + maxLengthPassword);
        if(!checkRegexp( password, /^([0-9a-zA-Z])+$/ ))
            throw Error("Пароль пользователя может состоять только из символов 0-9 a-z A-Z.");
    }

    // Конструктор
    function User(name, surname, age, email, password) {

        checkName( name );
        checkSurname( surname );
        checkAge( age );
        checkEmail( email );
        checkPassword( password );
        
        if(!instance){
            id++;
            this.age = age;
            this.name = name;
            this.email = email;
            this.surname = surname;
            this.password = password;
            instance = this;
        }
        else {
//            instance.age = age;
//            instance.name = name;
//            instance.email = email;
//            instance.surname = surname;
//            instance.password = password;
            return instance;
        }
    }

    // Публичные методы
    User.prototype.getId = function() {
        return id;
    };
    User.prototype.setName = function(name){
        checkName( name );
        this.name = name;
    };
    User.prototype.setSurname = function(surname){
        checkSurname( surname );
        this.surname = surname;
    };
    User.prototype.setEmail = function(email){
        checkEmail( email );
        this.email = email;
    };
    User.prototype.setPassword = function(password){
        checkPassword( password );
        this.password = password;
    };
    User.prototype.setAge = function(age){
        checkAge( age );
        this.age = age;
    };
    
    User.prototype.toString = function(){
        var userData = "";
        userData += "id: " + id;
        userData += "; Полное имя: " + this.name + " " + this.surname;
        userData += "; Возраст: " + this.age;
        userData += "; Email: " + this.email;
        userData += "; Пароль: " + this.password;
        return userData;
    };

    return User;
};
