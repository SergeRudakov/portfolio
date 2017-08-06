var Timer = function() {
    var self = this;

    this.ui = {
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
        minutesLabel: document.getElementById('minutes-label'),
        senondsLabel: document.getElementById('seconds-label')
    }

    this.init = function() {
	    var duration = 60 * 60;
	    if( localStorage.getItem('time') ){
	    	var localStorageTime = JSON.parse(localStorage.getItem('time')),
	    		localStorageduration = localStorageTime.minutes*60 + localStorageTime.seconds;

	    	self.startTimer(localStorageduration);
	    } else {
	    	self.startTimer(duration);
	    }
    }

    this.startTimer = function(duration) {
	   var timer = duration, minutes, seconds;
	    setInterval(function () {
	        minutes = parseInt(timer / 60, 10);
	        seconds = parseInt(timer % 60, 10);

	        minutes = minutes < 10 ? "0" + minutes : minutes;
	        seconds = seconds < 10 ? "0" + seconds : seconds;

	        var minutesLable = 'минут',
	        	seconsLabel = 'секунд';

	        if (minutes == 0 || minutes > 5){
	        	minutesLable = 'минут';
	        } else if ( minutes == 1){
	        	minutesLable = 'минута';
	        } else if ( minutes >1 && minutes <5){
	        	minutesLable = 'минуты';
	        }


	        if (seconds == 0 || seconds > 5){
	        	seconsLabel = 'секунд';
	        } else if ( seconds == 1){
	        	seconsLabel = 'секунда';
	        } else if ( seconds >1 && seconds <5){
	        	seconsLabel = 'секунды';
	        }


	        self.ui.minutes.innerHTML = minutes;
	        self.ui.minutesLabel.innerHTML = minutesLable;
	        self.ui.seconds.innerHTML = seconds;
	        self.ui.senondsLabel.innerHTML = seconsLabel;

	        localStorage.setItem('time', JSON.stringify( {'minutes': parseInt(minutes), 'seconds': parseInt(seconds) }) );

	        if (--timer < 0) {
	            timer = duration;
	        }
	    }, 1000);
    }

    this.init()
};var timer = new Timer();