class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.references :chat

      t.string :from
      t.string :to
      t.text :content

      t.timestamps
    end
  end
end
