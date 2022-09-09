export default {
    data() {
        return {
            vendors: [],
            categories: [],
            loadPending: false,
        }
    },
    methods: {
        getCategoriesAndVendors() {
            this.loadPending = true;
            let fetches = [
                fetch("http://localhost:3000/categories"),
                fetch("http://localhost:3000/vendors"),
            ];
            Promise.all(fetches)
                .then((responses) => {
                    return Promise.all(responses.map((r) => r.json()));
                })
                .then((data) => {
                    this.categories = data[0].map((el) => ({
                        value: el._id,
                        text: el.name,
                    }));
                    this.vendors = data[1].map((el) => ({ value: el._id, text: el.name }));
                    this.loadPending = false;
                })
                .catch((e) => {
                    console.log(e);
                    this.loadPending = false;
                });
        },
    }
}