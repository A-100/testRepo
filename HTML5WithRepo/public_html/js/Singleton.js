/**
 * Created with IntelliJ IDEA.
 * User: admn
 * Date: 01.02.14
 * Time: 9:40
 * To change this template use File | Settings | File Templates.
 */



function checkSingleton(){
    var city1 = new City();
    var city2 = new City();
    console.log( city1 == city2 );
}

function City(){

    if( typeof City.instance === "object"){
        return City.instance;
    }

    City.instance = this;

    return this;
}



function clienSingleton(){
    // user1 === user2 // true

    /*var  obj1 = {prop:"p"}
    var  obj2 = {prop:"p"}*/

    CityPrivate.prototype.prop1 = "prop1";
    var c1 = new CityPrivate();
    var c2 = new CityPrivate();
    CityPrivate.prototype.prop2 = "prop2";
    //c1.instance

    console.log( c1 === c2 );
    console.log( c1.prop1 );
    console.log( c1.prop2 );
    console.log( c1.constructor.name ); // CityPrivate || instance
    console.log( c1.constructor === CityPrivate ); //true;

    //console.log( obj1 == obj2 );
}


function CityPrivate(){
    var instance;// = this;
    // private var ...name

    CityPrivate = function(){
        return instance;
    }
    CityPrivate.prototype = this;
    instance = new CityPrivate();
    //instance.constructor.name = CityPrivate.toString();
    instance.constructor = CityPrivate;

    // public
    //setName
    return instance;
}


function CityGlobal(){
    CityGlobal.prototype = this;

    //City.prototype = this;
    //instance
    if(  typeof CityGlobal.instance === "object"){
        return CityGlobal.instance;
    }
    name:"D";

    CityGlobal.prototype = this;

    return this;
}
