require 'faye/message_server'

module Admin::Consultings

  class ConsultingsController < AdminController

    def show
      respond_to do |format|
        format.html
        format.json { render json: current_user }
      end
    end

    def update
      current_user.update_attributes!(online: params[:online])
      render json: current_user
    end

    private

    def close_consulting
      @agent.active_chats.each do |chat|
        Rails.logger.info "Send close chat message to #{chat.id}"
        Faye::MessageServer.new.send "/client/#{chat.id}", action: 'CLOSE_CHAT', data: chat
      end
    end

  end

end
