class NotifycationChannel < ApplicationCable::Channel
  CHANNEL_IDENTIFY = :general_notification_channel
  NOTIFY_TYPES = {
    new_video: 'new_video_has_been_shared'
  }

  def subscribed
    stream_from CHANNEL_IDENTIFY
  end

  def unsubscribed
    stop_all_streams
  end

  def receive(data)
    case data['type']
    when NOTIFY_TYPES[:new_video]
      notify_new_video_shared(data['id']) if data['id']
    end
  end

  private

  def notify_new_video_shared id
    resource =  Resource.includes(:user).find_by(id: id)
    return unless resource

    video = VideoInfo.new(Settings.video_info.prefix.youtube + resource.resource_id)
    return unless video&.title

    ActionCable.server.broadcast(
      CHANNEL_IDENTIFY, {
        type: :notify,
        message: :new_video_has_been_shared,
        sender: resource.user.email,
        data: { resourceTitle: video.title }
      }
    )
  end
end
