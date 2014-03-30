require 'faye/message_server'

module Consultings
  class MessagesController < ApplicationController

    def create
      message = Message.create(
          chat_id: params[:chat_id],
          content: params[:content],
          from: params[:from],
          to: params[:to]
      )
      sent_to_admin(params[:consulting_id], message)
      render status: :created, nothing: true
    end

    private
    def sent_to_admin(online_agent_id, message)
      Rails.logger.info "Send message to admin #{online_agent_id}"
      Faye::MessageServer.new.send "/admin/#{online_agent_id}", action: 'MESSAGE', data: message
    end

  end
end
