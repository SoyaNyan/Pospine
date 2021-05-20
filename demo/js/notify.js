// web notification api
const checkNotify = () => {
	let isGranted = false;

	// check browser supports notification API
	if (!("Notification" in window)) {
		alert("This browser does not support desktop notification");
	} else if (Notification.permission === "granted") {
		// if permission granted
		let noti = new Notification("First Notification");
		isGranted = true;
	} else if (Notification.permission !== "denied") {
		// if permission denied
		Notification.requestPermission(function (permission) {
			if (permission === "granted") {
				let noti = new Notification("First Notification");
				isGranted = true;
			}
		});
	}

	return isGranted;
};

/*
    notification object
    {
        title: '',
        options: {
            body: '',
            icon: ''
        }
    }
*/

const notify = (notification) => {
	if (checkNotify()) {
		let noti = new Notification(notification.title, notification.options);

		// close notification in 4 seconds
		setTimeout(noti.close.bind(noti), 4000);
	}
};
