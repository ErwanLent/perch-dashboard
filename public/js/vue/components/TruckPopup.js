Vue.component('truck-popup', {
    template: '#truck-popup-template',  
    data: function() {
        return {
            selectedTruck: {}
        };
    },
    mounted: function() {
        EventBus.$on("newSelectedTruck", truck => {
          this.selectedTruck = truck;
        });
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