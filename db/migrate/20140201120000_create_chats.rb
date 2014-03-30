class CreateChats < ActiveRecord::Migration
  def change
    create_table :chats do |t|
      t.references :user
      t.boolean :online
      t.string :customer_name
      t.string :customer_phone
      t.datetime :expire_at

      t.timestamps
    end
  end
end
