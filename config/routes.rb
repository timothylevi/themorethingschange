Rails.application.routes.draw do
  match "*path", to: "react#index", via: :all
  get "/", to: "react#index"
end
