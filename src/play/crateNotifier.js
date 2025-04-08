const CrateEvent = {
    System: 'system',
    Open: 'crateOpen',
  };
  
  class CrateMessage {
    constructor(from, type, value) {
      this.from = from;
      this.type = type;
      this.value = value;
    }
  }
  
  class CrateEventNotifier {
    events = [];
    handlers = [];
  
    constructor(username) {
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
      console.log('🔌 Attempting WebSocket connection...');

      this.username = username;
  
      this.socket.onopen = () => {
        // Trigger connection message
        this.receiveEvent(new CrateMessage('System', CrateEvent.System, `${this.username} connected`));
      };
  
      this.socket.onclose = () => {
        // Trigger disconnection message
        this.receiveEvent(new CrateMessage('System', CrateEvent.System, `${this.username} disconnected`));
      };
  
      this.socket.onmessage = async (msg) => {
        try {
          let data;
          if (typeof msg.data === 'string') {
            data = JSON.parse(msg.data);
          } else if (msg.data instanceof Blob) {
            const text = await msg.data.text();
            data = JSON.parse(text);
          } else {
            throw new Error("Unsupported WebSocket message format");
          }
      
          this.receiveEvent(data);
        } catch (err) {
          console.error('Failed to parse WebSocket message:', err);
        }
      };         
    }
  
    broadcastCrateOpen(crateItem) {
      // Create a CrateMessage and send it to server
      const event = new CrateMessage(this.username, CrateEvent.Open, crateItem);
      this.socket.send(JSON.stringify(event));
    }
  
    addHandler(handler) {
      this.handlers.push(handler);
    }
  
    removeHandler(handler) {
      this.handlers = this.handlers.filter((h) => h !== handler);
    }
  
    receiveEvent(event) {
      // Push and handle incoming events
      this.events.push(event);
      this.handlers.forEach((handler)=>handler(event));
      };
    }
  
  export { CrateEvent, CrateEventNotifier };
  