require 'faye'
require 'thin/logging'

class FayeLogger
  include Thin::Logging
end

logger = FayeLogger.new

Faye::WebSocket.load_adapter('thin')

app = Faye::RackAdapter.new(:mount   => '/faye',
  :timeout => 25
)

app.bind(:subscribe) do |client_id, channel|
  logger.log_info "#{Time.now} [SUBSCRIBE] #{client_id} -> #{channel}"
end

app.bind(:unsubscribe) do |client_id, channel|
  logger.log_info "#{Time.now} [UNSUBSCRIBE] #{client_id} -> #{channel}"
end

app.bind(:disconnect) do |client_id|
  logger.log_info "#{Time.now} [DISCONNECT] #{client_id}"
end

app.bind(:publish) do |client_id, channel, data|
  logger.log_info "#{Time.now} [PUBLISH] #{client_id} -> #{channel}: #{data}"
end

run app
