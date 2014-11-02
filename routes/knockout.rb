class KnockoutDemoApp < Sinatra::Application
  get '/knockout-version' do
      erb :"knockout/index"
  end
end