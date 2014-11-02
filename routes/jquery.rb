class KnockoutDemoApp < Sinatra::Application
  get '/jquery-version' do
      erb :"jquery/index"
  end

  get '/jquery/search' do
      @results = AmazonApi.search(params[:q])
      erb :"jquery/results"
  end

  get '/jquery/details' do
      @result = AmazonApi.get_details(params[:asin])
      erb :"jquery/details"
  end
end