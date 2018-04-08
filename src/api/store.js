function storeMap() {
    var mapStore = new Map();

    this.set = function (key, value) {
        mapStore.set(key, value);
    };

    this.get = function (key) {
        return mapStore.get(key);
    };

    this.delete = function (key) {
        mapStore.delete(key);
    };

}
var map = new storeMap();
export default map;
