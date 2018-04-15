Vue.component('truck-popup', {
    template: '#truck-popup-template',
    data: function() {
        return {

        };
    },
    mounted: function() {

    },
    methods: {
    	closePopup: function() {
            if (isPopupOpen) {
                $('.truck-popup').toggle("slide", {
                    direction: "right"
                });

                isPopupOpen = false;
            }
    	}
    }
});