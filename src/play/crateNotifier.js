// events
const CrateEvent = {
    System: 'system',
    Open: 'crateOpen',
  };

// message constructor
  class CrateMessage {
    constructor(from, type, value) {
      this.from = from;
      this.type = type;
      this.value = value;
    }
  }

// internalize
  class CrateEventNotifier {
    events = [];
    handlers = [];
  
    constructor(username) {
      const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
      this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
      this.username = username;
  
      this.socket.onopen = () => {
        this.receiveEvent(new CrateMessage('System', CrateEvent.System, `${this.username} connected`));
      };
  
      this.socket.onclose = () => {
        this.receiveEvent(new CrateMessage('System', CrateEvent.System, `${this.username} disconnected`));
      };
  
      this.socket.onmessage = async (msg) => {
        try {
          const event = JSON.parse(await msg.data.text());
          this.receiveEvent(event);
        } catch (err) {
          console.error('Invalid WebSocket message', err);
        }
      };
    }

// send message when new crate is opened
    broadcastCrateOpen(crateItem) {
      const event = new CrateMessage(this.username, CrateEvent.Open, crateItem);
      this.socket.send(JSON.stringify(event));
    }
 
// add handler
    addHandler(handler) {
      this.handlers.push(handler);
    }
  
// remove handler
    removeHandler(handler) {
      this.handlers = this.handlers.filter((h) => h !== handler);
    }

// receive handles  
    receiveEvent(event) {
      this.events.push(event);
      this.handlers.forEach((handler) => handler(event));
    }
  }
  
  export { CrateEvent, CrateEventNotifier };
  