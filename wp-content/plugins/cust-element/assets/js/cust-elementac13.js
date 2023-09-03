function copyToClipboard(el) {
	var content = jQuery(el).siblings('div.copy-content').html()
	var temp = jQuery("<textarea>");
	jQuery("body").append(temp);
	temp.val(content.replace(/<br ?\/?>/g, "\n")).select();
	document.execCommand("copy");
	temp.remove();

	var text = jQuery(el).html()
	jQuery(el).html(jQuery(el).data('message'))
	var counter = 0;
	var interval = setInterval(function() {
		counter++;
		
		if (counter == 2) {			
			jQuery(el).html(text)
			clearInterval(interval);
		}
	}, 1000);
}

jQuery('document').ready(function($){
	var isPlay = window.settingAutoplay;
	if(isPlay){
		$('#mute-sound').show();
		document.getElementById('song').play();
	}
	else{
		$('#unmute-sound').show();		
	}
	
	$('#bgsound-container').click(function(event){
		if(!isPlay){
			$('#unmute-sound').hide();
			$('#mute-sound').show();
			document.getElementById('song').play();
			isPlay = true;
		}
		else{
			$('#mute-sound').hide();
			$('#unmute-sound').show();
			document.getElementById('song').pause();
			isPlay = false;
		}
	});
	
	$('#custom-comment-box').submit(function(e){
		e.preventDefault()
		var image = cevar.plugin_url + "user-admin.png";
		var id = $('.comment-box-container').data('id');
		var avatar = $('#hidden-avatar img').attr('src');
		var data = 'action=comment_box_submit&id='+id+'&avatar='+avatar+'&'+$(this).serialize()
		$.post(cevar.ajax_url, data, function(resp){
			$('.list-comment').prepend(resp)
			$('#custom-comment-box')[0].reset()
		})
	})
	
});