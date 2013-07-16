function addAPIParameters (url, p) {
	var url = url
	$.each (p, function (k, v) {			
		if (k == "filter") {
			$.each (this, function (k, v) {
				if (!(v == null)) {
					url += "&filter=" + k + ":" + v;
				};
			});
		} else if (k == "sort") {
			var i = 1;
			$.each (this, function (k, v) {
				if (!(v == null)) {
					if (i == 1) {
						url += "&sort=" + k + ":" + v;
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