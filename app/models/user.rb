class User < ActiveRecord::Base

  devise :database_authenticatable, :registerable, :rememberable

  scope :current_active, -> {
    where('online = ?', true).order('id')
  }

  def as_json(options={})
    {
      id: id,
      online: online
    }
  end

end
