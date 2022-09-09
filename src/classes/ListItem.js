export default class ListItem {
    constructor(options) {
        options = {
            category: "",
            vendor: "",
            done: false,
            item: '',
            ...options
        }
        return options;
    }
}