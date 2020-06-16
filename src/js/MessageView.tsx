/* Copyright Airship and Contributors */

'use strict';

import React from "react";
import { requireNativeComponent, NativeSyntheticEvent } from "react-native";

const UARCTMessageView = requireNativeComponent('UARCTMessageView');

/**
 * Enum of possible message load errors
 */
export enum MessageLoadError {
  /**
   * The message is not available.
   */
  NotAvailable = "MESSAGE_NOT_AVAILABLE",
  /**
   * Failed to fetch the message.
   */
  FetchFailed = "FAILED_TO_FETCH_MESSAGE",
  /**
   * Failed to load the message.
   */
  LoadFailed = "MESSAGE_LOAD_FAILED"
}

/**
 * Message load started event.
 */
export interface MessageLoadStartedEvent {
  /**
   * The message ID.
   */
  messageId: string
}

/**
 * Message load finished event.
 */
export interface MessageLoadFinishedEvent {
  /**
   * The message ID.
   */
  messageId: string
}

/**
 * Message load error event.
 */
export interface MessageLoadErrorEvent {
  /**
   * The message ID.
   */
  messageId: string
  /**
   * Whether the failure is retriable.
   */
  retriable: boolean
  /**
   * The error
   */
  error : MessageLoadError
}

/**
 * Message closed event
 */
export interface MessageClosedEvent {
  /**
   * The message ID.
   */
  messageId: string
}

/**
 * UAMessageView props
 */
export interface MessageViewProps {
  /**
   * A callback when the view starts loading a message.
   * @memberof UAMessageView
   * @instance
   */
  onLoadStarted: (event:MessageLoadStartedEvent) => void;
  /**
   * A callback when the view finishes loading a message.
   * @memberof UAMessageView
   * @instance
   */
  onLoadFinished: (event:MessageLoadFinishedEvent) => void;
  /**
   * A callback when the view fails to load a message with an error.
   * @memberof UAMessageView
   * @instance
   */
  onLoadError: (event:MessageLoadErrorEvent) => void;
  /**
   * A callback when the message is closed.
   * @memberof UAMessageView
   * @instance
   */
  onClose: (event:MessageClosedEvent) => void;
}

/**
 * Inbox message view component.
 */
export default class MessageView extends React.Component<MessageViewProps> {

  _onLoadStarted = (event:NativeSyntheticEvent<MessageLoadStartedEvent>) => {
    if (!this.props.onLoadStarted) {
      return;
    }
    this.props.onLoadStarted(event.nativeEvent);
  };

  _onLoadFinished = (event:NativeSyntheticEvent<MessageLoadFinishedEvent>) => {
    if (!this.props.onLoadFinished) {
      return;
    }
    this.props.onLoadFinished(event.nativeEvent);
  };

  _onLoadError = (event:NativeSyntheticEvent<MessageLoadErrorEvent>) => {
    if (!this.props.onLoadError) {
      return;
    }
    this.props.onLoadError(event.nativeEvent);
  };

  _onClose = (event:NativeSyntheticEvent<MessageClosedEvent>) => {
    if (!this.props.onClose) {
      return;
    }
    this.props.onClose(event.nativeEvent);
  };

  render() {
    return <UARCTMessageView {...this.props} onLoadError={this._onLoadError} onLoadStarted={this._onLoadStarted} onLoadFinished={this._onLoadFinished} onClose={this._onClose} />;
  }
}
