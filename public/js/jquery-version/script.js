$(function(){
	$('form').on('submit', function(e){
		e.preventDefault();
		var $button = $(".search");
		$button.button('loading');
		$("#spinner-row").toggle();
		$("table").find("tr:gt(1)").remove();
		$.get('/jquery/search?q=' + $("#search-textbox").val(),function(results){
			$("table tr:last").after(results);
			$button.button('reset');
			$("#spinner-row").toggle();
		});
	});

	$("table").on('click', '.details', function(){
		var $button = $(this);
		var status = $button.data('status');
		var $tr = $button.parent().parent();
		var asin = $tr.data('asin');
		if(status === 'closed'){
			if($("#details-" + asin).length > 0){
				$("#details-" + asin).toggle();	
				setDetailsButtonToClose($button);
			}
			else{
				$button.button('loading');
				$.get('/jquery/details?asin=' + asin, function(results){
					$tr.after(results);
					$button.button('reset');
					setDetailsButtonToClose($button);
				});
			}
		}
		else{
			$button.html('Details');
			$button.data('status', 'closed');
			$("#details-" + asin).toggle();
		}
	})

	function setDetailsButtonToClose($button){
		$button.html('Close');
		$button.data('status', 'open');			
	}
})