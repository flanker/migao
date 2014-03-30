module Consultings
  class ConsultingsController < ApplicationController

    def index
      @agents = User.current_active
    end

  end
end
