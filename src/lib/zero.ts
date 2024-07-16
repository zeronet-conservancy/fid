let waiting_cb = {};
let message_queue = []
let next_message_id = 0;
let connected = false;
let ws;

export const connectWS = () => {
  if (ws)
    return;
  const wrapper_nonce = document.location.href.replace(/.*wrapper_nonce=([A-Za-z0-9]+).*/, "$1");
  const origin = window.server_url || window.location.href.replace(/(\:\/\/.*?)\/.*/, "$1");
  let proto;

  if (origin.indexOf("https:") === 0) {
    proto = {
      ws: 'wss',
      http: 'https'
    };
  } else {
    proto = {
      ws: 'ws',
      http: 'http'
    };
  }

  // const ws_url = proto.ws + ":" + origin.replace(proto.http + ":", "") + "/ZeroNet-Internal/Websocket?wrapper_key=" + window.wrapper_key;
  const ws_url = 'ws://127.0.0.1:43110/ZeroNet-Internal/Websocket'

  ws = new WebSocket(ws_url);
  ws.onmessage = onMessage;
  ws.onopen = onOpenWebsocket;
  ws.onerror = (e) => {
    console.log('Error', e);
  };
  ws.onclose = onCloseWebsocket;
  // return ws;
};


  const onMessage = (e) => {
    /* console.log(e); */
    const message = JSON.parse(e.data);
    const cmd = message.cmd;
    if (cmd === "response") {
      if (waiting_cb[message.to] != null) {
        return waiting_cb[message.to](message.result);
      } else {
        console.log("Websocket callback not found:", message);
      }
    } else if (cmd === "ping") {
      /* return response(message.id, "pong"); */
    } else {
      // err
    }
  };

  const onOpenWebsocket = (e) => {
    connected = true;
    console.log('WS open!');
    const msgs = [...message_queue];
    for (let msg of msgs) {
      ws.send(JSON.stringify(msg));
    }
    message_queue = [];
  };

  const onCloseWebsocket = (e) => {
    console.log('Connection closed');
    /* this.wrapperWsInited = false; */
    /* return setTimeout(() => {
     *   if (e && e.code === 1000 && e.wasClean === false) {
     *     return _this.ws_error = _this.notifications.add("connection", "error", "UiServer Websocket error, please reload the page.");
     *   } else if (e && e.code === 1001 && e.wasClean === true) {
     *     
     *   } else if (!_this.ws_error) {
     *     return _this.ws_error = _this.notifications.add("connection", "error", "Connection with <b>UiServer Websocket</b> was lost. Reconnecting...");
     *   }
     * }, 1000); */
  };



export const send = (message, cb) => {
  message.id = next_message_id;
  next_message_id += 1;

  if (connected) {
    ws.send(JSON.stringify(message));
  } else {
    console.log("Not connected, adding message to queue");
    message_queue.push(message);
  }
  if (cb) {
    waiting_cb[message.id] = cb;
  }
};
