// fun(1).add(1).min(-2).num => -2
function fun(x) {
  let ret = {
		add: function(z) {
			this.num = this.num + z;
      return ret;
		},
		min: function(z) {
			this.num = Math.min(this.num, z);
      return ret;
		},
    num: x,
	}
	return ret;
}
