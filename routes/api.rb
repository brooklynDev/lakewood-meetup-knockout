class KnockoutDemoApp < Sinatra::Application
  get '/api/v1/amazon/search' do
      content_type :json
      AmazonApi.search(params["q"]).to_json
  end

  get '/api/v1/amazon/details' do
      content_type :json
      AmazonApi.get_details(params["asin"]).to_json
  end

  post '/api/v1/db' do
      content_type :json
      FavoritesDB.add(params[:asin])
      {status: "OK"}.to_json
  end

  delete '/api/v1/db' do
      content_type :json
      FavoritesDB.delete(params[:asin])
      {status: "OK"}.to_json
  end

  get '/api/v1/db/exists' do
    content_type :json
    {exists: FavoritesDB.exists?(params[:asin])}
  end
end