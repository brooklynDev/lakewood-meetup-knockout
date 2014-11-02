require 'json'
require 'sinatra/partial'
Dir[File.dirname(__FILE__) + '/routes/*.rb'].each {|file| require file }

class KnockoutDemoApp < Sinatra::Application
  set :public_folder, 'public'
  set :partial_template_engine, :erb

  get '/' do
      redirect '/jquery-version'
  end
end