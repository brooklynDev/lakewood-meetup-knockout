var Service = function(){
	this.search = function(term){
		return $.get('/api/v1/amazon/search?q=' + term);
	}

	this.showDetails = function(asin){
		return $.get('/api/v1/amazon/details?asin=' + asin);
	}

	this.setFavorite = function(asin, value){
		return value ? $.post('/api/v1/favorites', {asin: asin}) : $.ajax({url:'/api/v1/favorites/' + asin, type: 'DELETE'});
	}
}

var AmazonViewModel = function(service){
	var self = this;
	self.service = service;
	self.searchTerm = ko.observable();
	self.results = ko.observableArray([]);
	self.modalText = ko.observable();
	self.hasSearched = ko.observable(false);

	self.searchClick = function(viewModel, evt){
		self.results([]);
		self.hasSearched(true);
		var $button = $(evt.target);
		$button.button('loading');
		self.service.search(self.searchTerm()).then(function(results){
			results.forEach(setResultObservableProperties);
			self.results(results);
			$button.button('reset');
		});
	}

	self.showSpinner = ko.computed(function(){
		return self.results().length == 0 && self.hasSearched();
	}, self);

	self.showDetails = function(result){
		if(!result.details){
			self.service.showDetails(result.asin).then(function(details){
				result.details = details;
				result.showDetails(true);
			});
		}
		else{
			result.showDetails(!result.showDetails());
		}
	}

	self.showModal = function(text){
		self.modalText(text);
		$("#myModal").modal();
	}

	function setResultObservableProperties(result){
		result.showDetails = ko.observable(false);
		result.buttonText = ko.computed(function(){
			return result.showDetails() ? "Close" : "Details"
		}, result);				
		result.isFavorite = ko.observable(result.is_favorite);
		result.isFavorite.subscribe(function(newValue){
			self.service.setFavorite(result.asin, newValue).then(function(){
				self.showModal(newValue ? (result.asin + ' added to favorites.') : (result.asin + ' removed from favorites.'));
			})
		});		
	}
}

$(function(){
	var amazonViewModel = new AmazonViewModel(new Service());
	ko.applyBindings(amazonViewModel);
})