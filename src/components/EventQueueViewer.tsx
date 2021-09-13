import type {Event} from '../types';

import React from 'react';

type Props = {
  eventQueue: Array<Event>
}

function EventQueueViewer({
  eventQueue
}: Props) {
  return (
    <div className="event-queue-viewer">
      {eventQueue.map((event, index) => (
        <div key={`${event.type}_${index}`} className="event-box"></div>
      ))}
    </div>
  )
}

export default EventQueueViewer;