class ReactController < ApplicationController
  def index
    @props = { title: "The More Things Change" }
  end
end
