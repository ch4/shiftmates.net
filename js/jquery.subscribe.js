jQuery(document).ready(function(){

	$('#subscribe').submit(function(){

		var action = $(this).attr('action');

		$("#mc_embed_signup").slideUp(750,function() {
		$('#mc_embed_signup').hide();

 		$('#ssubmit')
			.after('<img src="images/ajax-loader.gif" class="subscribe-loader" />')
			.attr('disabled','disabled');

		$.post(action, {
			email: $('#semail').val()
		},
			function(data){
				document.getElementById('mc_embed_signup').innerHTML = data;
				$('#mc_embed_signup').slideDown('slow');
				$('#subscribe img.subscribe-loader').fadeOut('slow',function(){$(this).remove()});
				$('#ssubmit').removeAttr('disabled');
				if(data.match('success') != null) $('#subscribe').slideUp('slow');

			}
		);

		});

		return false;

	});

});