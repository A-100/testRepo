/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function(){
    var e = [
        "article",
        "aside",
        "figcaption",
        "figure",
        "footer",
        "header",
        "hgroup",
        "nav",
        "section",
        "time"
    ];
    for (var i = 0; i < e.length; i++) {
      document.createElement(e[i]);
    };
}());