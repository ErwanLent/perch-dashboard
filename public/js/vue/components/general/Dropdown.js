Vue.component('dropdown', {
	template: '#dropdown-template',
	props: {
		placeholder: {
			type: String,
			default: 'Dropdown'
		},
		items: {
			type: Array,
			default: function () {
		    	return ['first', 'second', 'third']
		    }
		},
		onToggle: {
			type: Function,
			default: function() {}
		},
	},
	data: function() {
		return {};
	},
	mounted: function() {
		$(this.$vnode.elm).dropdown({
			onChange: this.onChange
		});
	},
	methods: {
		onChange: function(value) {
			this.onToggle(value);
		}
	}
});