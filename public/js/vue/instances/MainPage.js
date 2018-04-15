const MainPageInstance = new Vue({
	el: '#MainPage',
	data: {
		visible: true,
		selectedTruck: {},
		components: []
	},
	mounted: function() {
		// this.load();
	},
	methods: {
		showAllLoaders: function() {
			for (let component of this.components) {
				if (this.$refs[component] && this.$refs[component].showLoader) {
					this.$refs[component].showLoader();
				}
			}
		},
		load: function() {
			this.showAllLoaders();

			for (let component of this.components) {
				if (this.$refs[component] && this.$refs[component].load) {
					this.$refs[component].load();
				}
			}
		}
	}
});