module Admin
  class HomeController < AdminController

    def index
      redirect_to admin_consultings_path
    end

  end
end
