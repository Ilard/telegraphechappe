$(document).ready(function() {
    const   $setter = $('.setter'),
            $setterPosition = $setter.find('#position'),
            $setterMin = parseInt($setterPosition.attr('min')),
            $setterMax = parseInt($setterPosition.attr('max')),
            $setterPlus = $setter.find('.setter-form-controls-plus'),
            $setterMinus = $setter.find('.setter-form-controls-minus'),
            $positionRegulator = $setter.find('.position-regulator'),
            $positionIndicatorLeft = $setter.find('.position-indicatorLeft'),
            $positionIndicatorRight = $setter.find('.position-indicatorRight'),
            $telegraph = $('.telegraph'),
            $regulator = $telegraph.find('.regulator'),
            $indicatorRight = $telegraph.find('.indicatorRight'),
            $indicatorLeft = $telegraph.find('.indicatorLeft');

    // Set regulator and indicator position
    function removePositions(index, className) {
        let pattern = /Rotation.*/;
        return (className.match(pattern) || []).join(' ');
    }

    function setPositions(positions, position) {
        const   classRegulator = "regulatorRotation",
                classIndicator = "indicatorRotation";
        let regulatorPosition,
            indicatorRightPosition,
            indicatorLeftPosition;

        regulatorPosition = classRegulator + positions[position].regulator;
        indicatorLeftPosition = classIndicator + positions[position].indicatorLeft;
        indicatorRightPosition = classIndicator + positions[position].indicatorRight;

        // Add classes on regulator and indicators
        $regulator.removeClass(removePositions)
                  .addClass(regulatorPosition);
        $indicatorRight.removeClass(removePositions)
                   .addClass(indicatorRightPosition);
        $indicatorLeft.removeClass(removePositions)
                   .addClass(indicatorLeftPosition);

        $positionRegulator.text(positions[position].regulator);
        $positionIndicatorLeft.text(positions[position].indicatorLeft);
        $positionIndicatorRight.text(positions[position].indicatorRight);
    };

    // Get default position number
    $setterPosition.val($setterMin);

    // Get list of positions
    let jsonFile = "js/position.json",
        request = new XMLHttpRequest();

    request.open('GET', jsonFile);
    request.responseType = 'json';
    request.send();

    request.onloadend = () => {

        if (request.readyState === 4 && request.status === 200) {
            let positions = request.response;

            // TO DO : SI une position existe OU si la position change
            setPositions(positions, $setterMin);

            $setterPlus.on("click", function() {
                let val = parseInt($setterPosition.val());

                if (val < $setterMax) {
                    val += 1;
                    $setterPosition.val(val);
                    setPositions(positions, val);
                }
            });

            $setterMinus.on("click", function() {
                let val = parseInt($setterPosition.val());

                if (val > $setterMin) {
                    val -= 1;
                    $setterPosition.val(val);
                    setPositions(positions, val);
                }
            });

            $setterPosition.on('change input', function() {
                let val = parseInt($setterPosition.val());

                if (val > $setterMin && val < $setterMax) {
                    setPositions(positions, val);
                }

                if (val < $setterMin) {
                    $setterPosition.val($setterMin);
                    setPositions(positions, $setterMin);
                }

                if (val > $setterMax) {
                    $setterPosition.val($setterMax);
                    setPositions(positions, $setterMax);
                }
            });
        }
    };
});
