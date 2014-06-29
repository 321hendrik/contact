document.createElement("section");

var transitionTime = 600;

function playSectionAudio (sectionId) {
	var playingAudio = $('.playing');
	if (playingAudio.length) {
		playingAudio.animate({volume: 0.5}, transitionTime, function () {
			playingAudio.animate({volume: 0.0}, transitionTime, function () {
				playingAudio.get(0).pause();
				playingAudio.removeClass('playing');
			});
			var sectionAudio = $('#audio_' + sectionId);
			if (sectionAudio.length) {
				sectionAudio.get(0).play();
				sectionAudio.addClass('playing');
				sectionAudio.animate({volume: 1.0}, transitionTime*2);
			}
		});
	} else {
		var sectionAudio = $('#audio_' + sectionId);
		if (sectionAudio.length) {
			sectionAudio.volume = 0.0;
			sectionAudio.get(0).play();
			sectionAudio.addClass('playing');
			sectionAudio.animate({volume: 1.0}, transitionTime*2);
		}
	}

}

$(document).ready(function(){
	$window = $(window);

	// paralax scrolling
	$('section[data-type="background"]').each(function () {
		var bgobj = $(this);
		var basePos = '50% ' + bgobj.data('offset') + 'px';
		bgobj.css({ backgroundPosition:  basePos});
		$window.scroll(function () {
			$('section[data-type="background"]').each(function () {
				var bgobj = $(this);
				var yPos = -( $window.scrollTop() / bgobj.data('speed') ) + bgobj.data('offset');
				var coords = '50% ' + yPos + 'px';
				bgobj.css({ backgroundPosition: coords });
			});
		});
	});

	// navbar links
	var navbarElements = $('.nav').find('li');

	function activateNavbarElement (element, navbarElements) {
		navbarElements.removeClass('active');
		if(element) {
			element.addClass('active');
		}
	}

	navbarElements.bind('click', function () {
		activateNavbarElement( $(this), navbarElements );
	});

	$('.brand').bind('click', function () {
		activateNavbarElement( null, navbarElements );
	});

	// set hash while scrolling
	var activeSection = null;
	$window.bind('scroll',function(e){
		$('section').each(function(){
			if ( $(this).offset().top < window.pageYOffset + 10 && $(this).offset().top + $(this).height() > window.pageYOffset + 10 ) {
				var sectionId = $(this).attr('id');
				if (sectionId != activeSection) {
					activeSection = sectionId;
					// activate audio
					playSectionAudio(sectionId);

					// activate nav bar element
					if (sectionId == 'intro') {
						activateNavbarElement( null, navbarElements );
					} else {
						activateNavbarElement( $( '#link-' + sectionId), navbarElements );
					}
				}
			}
		});
	});
});