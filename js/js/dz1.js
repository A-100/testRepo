/* 
 * 
 */
window.onload = function() {
    
    var x, y, errorElem;
    errorElem = document.getElementById('error');
    x = document.getElementById('x');
    y = document.getElementById('y');
    createAndShow();
    
    x.onchange = createAndShow;
    y.onchange = createAndShow;
    document.getElementById('selectFigure').onchange = createAndShow;
    
    /*
     * Функция выполняет роль контекста в паттерне "Стратегия"
     */
    function createFigure(){
        var figure;
        var select = document.getElementById('selectFigure').value;
        var x = document.getElementById('x').value;
        var y = document.getElementById('y').value;
        switch (select){
            case 'сircle':
                figure = new Circle(x, y);
                break;
            case 'rectangle':
                figure = new Rectangle(x, y);
                break;
        }
        return figure;
    }
    
    /*
     * Вспомогательная функция для обработки выбора фигуры и отображения сведений о ней
     */
    function createAndShow(){
        try{
            var figure = createFigure();
            errorElem.style.display = 'none';
            document.getElementById('output').innerHTML = figure;
        }
        catch(e)
        {
            errorElem.style.display = 'block';
            errorElem.innerHTML = e.message;
        }
    }
};

/* Создание класса фигуры и производных от него классов */

function Figure(x, y, type)
{
    this.checkCoord = function(x, y){
        if(isNaN(parseFloat(x)))
            throw Error("Установлено некорректное значение фигуры: " + x);
        if(isNaN(parseFloat(y)))
            throw Error("Установлено некорректное значение фигуры: " + y);

        if(x < 0 || y < 0)
            throw Error("Координаты фигуры не могут быть отрицательными");
    };
    
    this.checkCoord(x, y);
    if(!type)
        throw Error("Не указан тип фигуры.");
    
    this.x = parseFloat(x);
    this.y = parseFloat(y);
    this.type = type;
};

Figure.prototype.move = function(newX, newY){
    this.checkCoord(newX, newY);
    this.x = newX;
    this.y = newY;
};
Figure.prototype.toString = function(){
    return "Class " + this.type + ". x: " + this.x + "; y: " + this.y;
};
Figure.prototype.print = function(){
    console.log(this);
};

function Circle(x, y)
{
    Figure.call(this, x, y, "Circle");
}
Circle.prototype = inherit(Figure.prototype);
Circle.prototype.constructor = Circle;

function Rectangle(x, y)
{
    Figure.call(this, x, y, "Rectangle");
}
Rectangle.prototype = inherit(Figure.prototype);
Rectangle.prototype.constructor = Rectangle;

