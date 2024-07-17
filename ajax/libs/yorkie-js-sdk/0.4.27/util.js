/**
 * `Network` is a class that manages the network status.
 */
class Network {
  constructor(elem) {
    this.isOnline = false;
    this.elem = elem;
  }

  /**
   * Show offline status.
   */
  showOffline() {
    this.isOnline = false;
    this.elem.innerHTML = '<span class="red"> </span>';
  }

  /**
   * Show online status.
   */
  showOnline() {
    this.isOnline = true;
    this.elem.innerHTML = '<span class="green"> </span>';
  }

  /**
   * Listen to the network status changes.
   */
  statusListener = (event) => {
    if (this.isOnline && event.value === 'disconnected') {
      this.showOffline();
    } else if (!this.isOnline && event.value === 'connected') {
      this.showOnline();
    }
  };
}
