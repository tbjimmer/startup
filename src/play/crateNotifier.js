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
        // Parse message and call receiveEvent
        const event = JSON.parse(await msg.data.text());
        this.receiveEvent(event);
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
      };
    }
  
  export { CrateEvent, CrateEventNotifier };
  