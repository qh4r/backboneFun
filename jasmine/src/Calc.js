var Calc = function(){
    function add(a, b){
        if(!a || !b){
            throw new Error('need two args');
        }
        return a + b;
    }

    return {
        add: add
    };
}