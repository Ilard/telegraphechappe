$(document).ready(function() {
    $.ajaxSetup({ cache: false });

    const   $setter = $('.setter'),
            $setterPosition = $setter.find('#position'),
            $setterMin = parseInt($setterPosition.attr('min')),
            $setterMax = parseInt($setterPosition.attr('max')),
            $setterPlus = $setter.find('.setter-form-controls-plus'),
            $setterMinus = $setter.find('.setter-form-controls-minus'),
            $positionRegulator = $setter.find('.position-regulator'),
            $positionIndicatorLeft = $setter.find('.position-indicatorLeft'),
            $positionIndicatorRight = $setter.find('.position-indicatorRight'),
            $debug = $setter.find('.debug'),
            $telegraph = $('.telegraph'),
            $regulator = $telegraph.find('.regulator'),
            $indicatorRight = $telegraph.find('.indicatorRight'),
            $indicatorLeft = $telegraph.find('.indicatorLeft');

    // Set regulator and indicators position
    function removePositions(index, className) {
        let pattern = /[a-zA-Z]+[0-9]{1}/;
        return (className.match(pattern) || []).join(' ');
    };

    function setSignal(signals, signal) {
        const   classRegulator = "regulatorRotation",
                classIndicator = "indicatorRotation";
        let regulatorPosition,
            indicatorRightPosition,
            indicatorLeftPosition;

        regulatorPosition = classRegulator + signals[signal].regulator;
        indicatorLeftPosition = classIndicator + signals[signal].indicatorLeft;
        indicatorRightPosition = classIndicator + signals[signal].indicatorRight;

        // Add classes on regulator and indicators
        $regulator.removeClass(removePositions)
                  .addClass(regulatorPosition);
        $indicatorRight.removeClass(removePositions)
                   .addClass(indicatorRightPosition);
        $indicatorLeft.removeClass(removePositions)
                   .addClass(indicatorLeftPosition);

        $positionRegulator.text(signals[signal].regulator);
        $positionIndicatorLeft.text(signals[signal].indicatorLeft);
        $positionIndicatorRight.text(signals[signal].indicatorRight);
    };

    // Get default position number
    $setterPosition.val($setterMin);

    // Get list of positions
    $.getJSON("js/signals.json", {
        format: "json"
    }, function(signals){
        setSignal(signals, $setterMin);

        // Increase manually the position
        $setterPlus.on("click", function() {
            let val = parseInt($setterPosition.val());

            if (val < $setterMax) {
                val += 1;
                $setterPosition.val(val);
                setSignal(signals, val);
            }
        });

        // Decrease manually the position
        $setterMinus.on("click", function() {
            let val = parseInt($setterPosition.val());

            if (val > $setterMin) {
                val -= 1;
                $setterPosition.val(val);
                setSignal(signals, val);
            }
        });

        $setterPosition.on('change input', function() {
            let val = parseInt($setterPosition.val());

            if (val > $setterMin && val < $setterMax) {
                setSignal(signals, val);
            }

            if (val < $setterMin) {
                $setterPosition.val($setterMin);
                setSignal(signals, $setterMin);
            }

            if (val > $setterMax) {
                $setterPosition.val($setterMax);
                setSignal(signals, $setterMax);
            }
        });

        // Get signal from server
        // function getSignal() {
        //     $.getJSON("signal.json", {
        //         format: "json"
        //     }, function(signal){
        //         setSignal(signals, signal.signal);
        //         $setterPosition.val(signal.signal);
        //     })
        //     .fail(function(xhr){
        //         $debug.text("Fichier du signal émis : " + xhr.status + " " + xhr.statusText);
        //     });
        // };
        //
        // setInterval(function(){
        //     getSignal();
        // }, 500);
    })
    .fail(function(xhr){
        $debug.text("Tableau des signaux : " + xhr.status + " " + xhr.statusText);
    });
});
