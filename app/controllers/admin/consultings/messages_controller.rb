require 'faye/message_server'

module Admin::Consultings

  class MessagesController < AdminController

    def create
      message = Message.create(
          chat_id: params[:chat_id],
          content: params[:content],
          from: params[:from],
          to: params[:to]
      )
      sent_to_client(params[:chat_id], message)
      render status: :created, nothing: true
    end

    private
    def sent_to_client(chat_id, message)
      Rails.logger.info "Send message to client #{chat_id}"
      Faye::MessageServer.new.send "/client/#{chat_id}", action: 'MESSAGE', data: message
    end

  end

end
