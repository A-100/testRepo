/**
 * Created with IntelliJ IDEA.
 * User: admn
 * Date: 08.02.14
 * Time: 10:44
 * To change this template use File | Settings | File Templates.
 */



var User = function(name1, name2){
    this.nameFirst = name1;
    this.nameSecond = name2;

    this.getFirstName = function(){
        return this.nameFirst;
    }
    this.getSecondName = function(){
        return this.nameSecond;
    }
}



var WrapperUser = function( user ){
    this.conUser = user;

    this.getUser = function(){
        return this.conUser;
    }

    this.fullName = function(){
        console.log( user.getFirstName() + " " + user.getSecondName());
    }

    this.reverce = function(){
        console.log( user.getSecondName()+" "+ user.getFirstName());
    }

    this.convert = function (string){
        // BL
    }
}

function client(){
    var u = new User("Ivan", "Ivanov");
    var wu = new WrapperUser( u );

    wu.fullName();
    wu.reverce();
    // "nameneme2";
    wu.convert("name1_neme2");
    console.log( wu.conUser.getFirstName() );
}