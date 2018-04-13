Vue.component('modal', {
	template: '#modal-template',
	props: {
		size: {
			type: String,
			default: "default"
		}
	},
	data: function() {
		return {
			maxHeight: ''
		};
	},
	computed: {
		modalContentStyle: function() {
			return {
				maxHeight: this.maxHeight
			};
		}
	},
	mounted: function() {
		this.resize();
		window.addEventListener('resize', this.resize);

		$('[data-content]').popup();
	},
	beforeDestroy: function() {
		window.removeEventListener('resize', this.resize);
	},
	methods: {
		resize: function() {
			const MODAL_PADDING = 250;
			const maxModalHeight = window.innerHeight - MODAL_PADDING;
			if (this.$el.clientHeight >= maxModalHeight) {
				this.maxHeight = `${maxModalHeight}px`;
			}
		}
	}
});