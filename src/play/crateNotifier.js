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
      };
  
      this.socket.onclose = () => {
        // Trigger disconnection message
      };
  
      this.socket.onmessage = async (msg) => {
        // Parse message and call receiveEvent
      };
    }
  
    broadcastCrateOpen(crateItem) {
      // Create a CrateMessage and send it to server
    }
  
    addHandler(handler) {
      this.handlers.push(handler);
    }
  
    removeHandler(handler) {
      this.handlers = this.handlers.filter((h) => h !== handler);
    }
  
    receiveEvent(event) {
      // Push and handle incoming events
      });
    }
  }
  
  export { CrateEvent, CrateEventNotifier };
  