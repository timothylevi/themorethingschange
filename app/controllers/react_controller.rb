class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
end

class ReactController < ApplicationController
  def index
    @props = { title: "The More Things Change" }
  end
end
