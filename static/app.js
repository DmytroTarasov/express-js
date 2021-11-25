const App = {
    data() {
        return {
            entities: [],
            key: "",
            entity: {},
            entityType: "",
            property: "",
            value: "",
            searchEntities: [],
            msgDelete: "",
            msgCreate: "",
            newEntity: {},
        };
    },
    async mounted() {
        this.getEntityType();
    },
    methods: {
        async getEntityById() {
            const input = document.querySelector("#inputIdForGet");
            this.key = input.value;
            const res = await fetch(`/server/${this.entityType}/${this.key}`);
            input.value = "";
            this.entity = await res.json();
        },

        getEntityType() {
            const e = document.getElementById("entitySelect");
            console.log(typeof e.options);
            this.entityType = e.options[e.selectedIndex].text.toLowerCase();
            this.clearData();
        },
        async getAllEntities() {
            const res = await fetch(`/server/${this.entityType}`);
            this.entities = await res.json();
        },
        async searchEntity() {
            const res = await fetch(`/server/${this.entityType}/search/${this.property}/${this.value}`);
            this.property = "";
            this.value = "";
            this.searchEntities = await res.json();
        },
        async deleteEntityById() {
            const input = document.querySelector("#inputIdForDelete");
            this.key = input.value;
            const msg = await fetch(`/server/${this.entityType}/${this.key}/delete`, { method: "DELETE" });
            input.value = "";
            await msg.json().then(res => (this.msgDelete = res.msg));
        },
        async createEntity() {
            const keys = this.objectKeys(this.entity);
            let formChildren = document.querySelector("#formCreateEntity").children;
            formChildren = Array.from(formChildren);
            formChildren.forEach((c, i) => {
                this.newEntity[keys[i]] = c.value;
                c.value = "";
            });
            const res = await fetch(`/server/${this.entityType}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.newEntity),
            });
            await res.json().then(res => (this.msgCreate = res.msg));
        },
        entityInfo(entity) {
            let info = "";
            for (let key in entity) {
                if (key != "id" && entity[key]) {
                    info += key + ": ";
                    if (key.toLowerCase().includes("date")) {
                        info += entity[key].substr(0, 10) + ", ";
                    } else {
                        info += entity[key] + ", ";
                    }
                }
            }
            info = info.substr(0, info.length - 2);
            return info;
        },
        placeholderForCreate(key) {
            if (key.toLowerCase().includes("date")) {
                return "Enter " + key + " (yyyy-mm-dd)";
            }
            return "Enter " + key;
        },
        objectKeys(object) {
            return Object.keys(object).filter(k => k != "id");
        },

        clearData() {
            this.entities = [];
            this.searchEntities = [];
            this.entity = {};
            this.newEntity = {};
            this.msgCreate = "";
            this.msgDelete = "";
        },
    },
};

Vue.createApp(App).mount("#app");
