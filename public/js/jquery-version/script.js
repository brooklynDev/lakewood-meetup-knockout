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
			window.history.pushState(null, null, 'http://localhost:9292/jquery-version?q=' + $("#search-textbox").val());
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

	$('table').on('click', 'input[type="checkbox"]', function(){
		var $checkbox = $(this);
		var asin = $checkbox.data('asin');
		if($checkbox.is(':checked')){
			$.post('/api/v1/favorites', {asin: asin}, function(){
				showModal(asin + ' added to favorites.');
			})
		}
		else{
			$.ajax({
				url:'/api/v1/favorites/' + asin,
				type: 'DELETE',
				success: function(){
					showModal(asin + ' removed from favorites.');
				}
			});
		}
	})

	var searchQuery = getParameterByName('q');
	if(searchQuery){
		$("#search-textbox").val(searchQuery);
		$('form').submit();
	}


	function setDetailsButtonToClose($button){
		$button.html('Close');
		$button.data('status', 'open');			
	}

	function showModal(text){
		$(".modal-body").html(text);
		$("#myModal").modal();
	}

	function getParameterByName(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}	
})