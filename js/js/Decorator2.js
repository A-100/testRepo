/**
 * Created with IntelliJ IDEA.
 * User: admn
 * Date: 08.02.14
 * Time: 16:37
 * To change this template use File | Settings | File Templates.
 */

function House(){
    this.windows = function(){
        return 4;
    }
}

function child( house ){
    this.windows = function(){
        return house.windows() + 2;
    }
}

function living( house ){
    this.windows = function(){
        return house.windows() + 1;
    }
}



function clientDecorator2(){
    var house = new House();

    house = new child( house );
    house = new living( house );

    // house["child"] = new child(  );

    console.log( house.windows() );
}
