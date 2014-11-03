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

	self.searchClick = function(viewModel, evt){
		self.results([]);
		var $button = $(evt.target);
		$button.button('loading');
		self.service.search(self.searchTerm()).then(function(results){
			results.forEach(function(result){
				result.details = ko.mapping.fromJS(new DetailsViewModel());
				result.isFavorite = ko.observable(result.is_favorite);
				result.isFavorite.subscribe(function(newValue){
					self.service.setFavorite(result.asin, newValue).then(function(){
						self.showModal(newValue ? (result.asin + ' added to favorites.') : (result.asin + ' removed from favorites.'));
					})
				});
			})
			self.results(results);
			$button.button('reset');
		});
	}

	self.showSpinner = ko.computed(function(){
		return self.results() != null && self.results().length == 0;
	}, self);

	self.showDetails = function(result){
		if(!result.details.detailsLoaded()){
			self.service.showDetails(result.asin).then(function(details){
				ko.mapping.fromJS(details, result.details);	
				result.details.visible(true);			
				result.details.detailsLoaded(true);
			});
		}
		else{
			result.details.visible(!result.details.visible());
		}
	}

	self.showModal = function(text){
		self.modalText(text);
		$("#myModal").modal();
	}
}


var DetailsViewModel = function(){
	var self = this;
	self.asin = ko.observable();
	self.rating = ko.observable();
	self.reviews = ko.observable();
	self.sold_by = ko.observable();
	self.price = ko.observable();
	self.description = ko.observable();
	self.visible = ko.observable(false);
	self.detailsLoaded = ko.observable(false);
	self.buttonText = ko.computed(function(){
		return self.visible() ? "Close" : "Details"
	}, self);
}

$(function(){
	var amazonViewModel = new AmazonViewModel(new Service());
	ko.applyBindings(amazonViewModel);
})