import { useEffect, useRef } from 'react'
import ActionCable from 'action-cable-react-jwt'
import { WS_URL } from '../consts/common'

export function useActionCable() {
  const accessToken = localStorage.getItem('jwt')
  const actionCable = ActionCable.createConsumer(WS_URL, accessToken)
  useEffect(() => {
    return () => {
      actionCable.disconnect()
    }
  }, [])

  return { actionCable }
}

export function useChannel(actionCable: any) {
  const channelRef: any = useRef()

  const unsubscribe = () => {
    if (channelRef.current) {
      actionCable.subscriptions.remove(channelRef.current)
      channelRef.current = undefined;
    }
  }

  const subscribe = (data: any, callbacks: any) => {
    const channel = actionCable.subscriptions.create(data, {
      received: (dataReceived: any) => {
        if (callbacks.received) callbacks.received(dataReceived)
      },
      initialized: () => {
        if (callbacks.initialized) callbacks.initialized()
      },
      connected: () => {
        if (callbacks.connected) callbacks.connected()
      },
      disconnected: () => {
        if (callbacks.disconnected) callbacks.disconnected()
      },
    })

    channelRef.current = channel
  }

  useEffect(() => {
    return () => {
      unsubscribe()
    }
  }, [])

  const send = (payload: object) => {
    if (channelRef.current) channelRef.current.send(payload)
  }

  const perform = (method_name: 'subscribe' | 'unsubscribe' | 'send', args: any) => {
    if (channelRef.current) channelRef.current.perform(method_name, args)
  }

  return {
    subscribe,
    unsubscribe,
    send,
    perform,
    ref: channelRef,
  }
}
