export default class MessageClient {
    constructor(url) {
        this.url = url;
        this.connect(url);
    }
  
    connect(url) {
        if (this.isOpen()) {
            this.socket.close();
        }
    
        this.socket = new WebSocket(url);
        this.socket.onmessage = this.handleMessage.bind(this);
        this.socket.onopen = this.handleOpen.bind(this);
        this.socket.onclose = this.handleClose.bind(this);
        this.socket.onerror = this.handleError.bind(this);
    
        console.log('Connecting to socket');
    }
  
    isOpen() {
        return this.socket && this.socket.readyState === 1;
    }
  
    handleMessage(event) {
        let message = JSON.parse(event.data);
    
        console.info('websocket message', message);
    
        switch (message.message) {
        case 'ping':
            this.socket.send(JSON.stringify({message: 'pong'}));
            return;        
        case 'refresh':
            window.location.reload();
            return;
        default:
            return;
        }

    }
  
    handleOpen(event) {
        this.socket.send(JSON.stringify({message: 'ping', count: 0}));
        console.log('open', event);
    }
  
    handleClose(event) {
        console.log('close', event);
        this.isOpen = false;
        this.connect(this.url);
    
    }
  
    handleError(event) {
        console.log('error', event);
    }
}
