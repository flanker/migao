require 'faye/message_server'

module Consultings
  class ChatsController < ApplicationController

    before_action :get_online_agent, only: [:create, :update]
    after_action :notify_agent, only: [:create]
    before_action :get_online_chat, only: [:show, :update]

    def new
      render json: Chat.create
    end

    def create
      @chat = Chat.create(
          user: @agent,
          customer_name: params[:name],
          customer_phone: params[:phone],
          online: true,
          expire_at: 1.hour.from_now
      )
      redirect_to consulting_chat_path(params[:consulting_id], @chat)
    end

    def show
      if @chat.online
        respond_to do |format|
          format.html
          format.json { render json: @chat}
        end
      else
        render 'closed'
      end
    end

    def update
      @chat.update_attributes!(online: params[:online])
      close_chat
      render nothing: true
    end

    private

    def get_online_chat
      @chat = Chat.find(params[:id])
    end

    def get_online_agent
      @agent = User.find(params[:consulting_id])
    end

    def notify_agent
      Rails.logger.info "Send new chat message to #{@agent.id}"
      Faye::MessageServer.new.send "/admin/#{@agent.id}", action: 'NEW_CHAT', data: @chat
    end

    def close_chat
      Rails.logger.info "Send close chat message to #{@agent.id}"
      Faye::MessageServer.new.send "/admin/#{@agent.id}", action: 'CLOSE_CHAT', data: @chat
    end

  end
end
