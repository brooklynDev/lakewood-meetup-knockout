require 'json'

class KnockoutDemoApp < Sinatra::Application
	set :public_folder, 'public'

	get '/' do
		@results = AmazonApi.search(params["q"])
		render :erb, :index
	end

	get '/api/amazon/search' do
		content_type :json
		AmazonApi.search(params["q"]).to_json
	end
end