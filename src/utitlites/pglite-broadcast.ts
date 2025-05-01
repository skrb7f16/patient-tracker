const bc = new BroadcastChannel('pglite-sync');

export function broadcastChange(event: string, payload?: any) {
  bc.postMessage({ event, payload });
}

export function onBroadcastChange(callback: (event: string, payload: any) => void) {
  bc.onmessage = (msg) => {
    const { event, payload } = msg.data;
    callback(event, payload);
  };
}
