class EventHandler {
    listen(name, callback) {
        var callbacks = this[name];
        if (!callbacks) this[name] = [callback];
        else callbacks.push(callback);
    }

    invoke(name, event) {
        var callbacks = this[name];
        if (callbacks) callbacks.forEach(callback => callback(event));
    }
}

const ValueType = {
    String: 0,
    Integer: 1,
    Float: 2,
    Boolean: 3
}

const BindingType = {
    Global: 0,
    Character: 1
}