class Message < ActiveRecord::Base

  belongs_to :chat, foreign_key: 'chat_id'

  def as_json(options = {})
    {
      id: id,
      chat_id: chat_id,
      from: from,
      to: to,
      content: content,
      created_at: created_at.strftime('%F %T'),
      updated_at: updated_at.strftime('%F %T')
    }
  end

end