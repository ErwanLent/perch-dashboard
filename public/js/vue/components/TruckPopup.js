Vue.component('truck-popup', {
    template: '#truck-popup-template',  
    data: function() {
        return {
            selectedTruck: {},
            items: [],
            key: 'mealKits'
        };
    },
    watch: {
        key: function() {
            if (this.selectedTruck[this.key]) {
                this.items = this.selectedTruck[this.key];    
            }
        },
        selectedTruck: function() {
            if (this.selectedTruck[this.key]) {
                this.items = this.selectedTruck[this.key];    
            }
        }
    },
    mounted: function() {
        EventBus.$on("newSelectedTruck", truck => {
            if (isPopupOpen) {
                this.openClosePopup();
            }

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
    	},
        openClosePopup: function() {
            $('.truck-popup').toggle("slide", {
                direction: "right"
            });

            $('.truck-popup').toggle("slide", {
                direction: "right"
            });
        }
    }
});