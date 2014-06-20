function InputMap () {
    /**
     * InputMap holds a map< Action -> Event >
     */

    this.events = {};

    this.init = function() {
	this.events = new Object();
    }

    this.register = function(a, e) {
	this.events[a] = e;
    }

    this.unregister = function(a) {
	this.events[a] = null;
    }

    /**
     * Takes an action, and returns the event triggered by this action
     */
    this.getEvent = function(a) {
	for (e in this.events) {
	    if (e == a) {
		return this.events[e];
	    }
	}
	return null;
    }

    /**
     * Computes and returns all commands to perform. 
     * Each one should be called ( command.call() );
     */
    this.getCommands = function() {
	var commands = [];
	for (e in this.events) {
	    if (this.events[e].isPerformed)
		commands[commands.length] = this.events[e].command;
	}
	return commands;
    }

    /**
     * Retrieves the event bound to the matching action, and marks it as 
     * "performed" if the trigger matches. 
     */
    this.updateDown = function(a) {
	var event = this.getEvent(a);
	if (event != null) {
	    if (  event.trigger == TRIGGER_MAINTAIN ||
		  (event.trigger == TRIGGER_PRESS 
		   && (!event.wasDown)) ) {
		event.isPerformed = true;
	    } else {
		event.isPerformed = false;
	    }
	    event.wasDown = true;
	}
    }

    /**
     * Retrieves the event bound to the matching action, and marks it as 
     * "performed" if the trigger matches. 
     */
    this.updateUp = function(a) {
	var event = this.getEvent(a);
	if (event != null) {
	     if (event.trigger == TRIGGER_RELEASE) {
		 event.isPerformed = true;
	     }else{
		 event.isPerformed = false;
	     }
	    event.wasDown = false;
	}
    }

    /**
     * Cleans all registered events. 
     */
    this.clean = function() {
	this.events = [];
    }


}