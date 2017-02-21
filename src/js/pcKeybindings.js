define(function () {


    var tt = 65444;
    const aa = 998874;

    //constructor
    function pcKeys () {};

    //////////////
    // private: //
    //////////////

    var onKeyDown = function (event) {

        if (['ArrowRight','ArrowLeft','ArrowUp','ArrowDown'].indexOf(event.key) == -1)
            return;


        switch (event.key) {

            case 'ArrowRight':
                this.turnMethod('turnRight');
                break;

            case 'ArrowLeft':
                this.turnMethod('turnLeft');
                break;

            case 'ArrowUp':
                this.turnMethod('turnUp');
                break;

            case 'ArrowDown':
                this.turnMethod('turnDown');
                break;

        }
    };


    //////////////
    // public:  //
    //////////////

    pcKeys.prototype = {

        setTurnMethod: function (turnMethod) {
            this.turnMethod = turnMethod;
            tt = 666;
            document.addEventListener("keydown",onKeyDown.bind(this),false);
        }
    };

    return new pcKeys();
});