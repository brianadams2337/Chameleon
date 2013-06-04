function addAPIParameters (url, p) {
	var url = url
	$.each (p, function (k, v) {			
		if (k == "Filter") {
			$.each (this, function (k, v) {
				if (!(v == null)) {
					url += "&Filter=" + k + ":" + v;
				};
			});
		} else if (k == "Sort") {
			var i = 1;
			$.each (this, function (k, v) {
				if (!(v == null)) {
					if (i == 1) {
						url += "&Sort=" + k + ":" + v;
					} else {
						url += "," + k + ":" + v;
					};
					i++;
				};
			});
		} else {
			if (!(k == "URL" || k == "AjaxSettings" || v == null)) {
				url += "&" + k + "=" + v;
			};
		};
	});
	return url;
}

function defaultAjaxErrorFunction (content) {
	console.log(content);
}