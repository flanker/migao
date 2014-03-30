class Chat < ActiveRecord::Base

  belongs_to :user
  has_many :messages, foreign_key: 'chat_id'

  def as_json(options = {})
    {
      customer_name: customer_name,
      customer_phone: customer_phone,
      expire_at: expire_at.strftime('%F %T'),
      id: id,
      online: online,
      online_agent_id: user.id,
      online_agent_name: user.name,
      created_at: created_at.strftime('%F %T')
    }
  end

end
