require 'json'
require 'sinatra/partial'
Dir[File.dirname(__FILE__) + '/routes/*.rb'].each {|file| require file }

class KnockoutDemoApp < Sinatra::Application
  set :public_folder, 'public'
  set :partial_template_engine, :erb

  get '/' do
      redirect '/knockout-version'
  end

  private 
  
    def set_favorites(results)
      results.each{|r| r[:is_favorite] = FavoritesDB.exists?(r[:asin])}     
    end  
end