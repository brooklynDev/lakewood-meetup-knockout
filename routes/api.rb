class KnockoutDemoApp < Sinatra::Application
  get '/api/v1/amazon/search' do
      content_type :json
      set_favorites(AmazonApi.search(params["q"])).to_json
  end

  get '/api/v1/amazon/details' do
      content_type :json
      AmazonApi.get_details(params["asin"]).to_json
  end

  post '/api/v1/favorites' do
      content_type :json
      request_body = JSON.parse(request.body.read)
      p request_body
      FavoritesDB.add(request_body["asin"])
      {status: "OK"}.to_json
  end

  delete '/api/v1/favorites/:asin' do
      content_type :json
      FavoritesDB.delete(params[:asin])
      {status: "OK"}.to_json
  end

  get '/api/v1/favorites/:asin' do
    content_type :json
    {exists: FavoritesDB.exists?(params[:asin])}.to_json
  end
end