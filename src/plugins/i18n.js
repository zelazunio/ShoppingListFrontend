import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n);

const messages = {
    'en': {
        Categories: "Categories",
        Vendors: "Vendors",
        "Pending only": "Pending only",
        "Add new item": "Add new item",
        Item: "Item",
        Category: "Category",
        Vendor: "Vendor",
        ItemMsg: "Item or items split with coma sign.",
        InputMinLengthMsg: "Enter at least 3 letters...",
        "Confirm action": "Confirm action",
        "deleteQuestionPart1": "Do you want to delete",
        "deleteQuestionPart2": "items marked as",
        "deleteQuestionPart3": "done",
        "Delete": "Delete",
        "Cancel": "Cancel",
        "OtherCategory": "Other",
        "OtherVendor": "Other"
    },
    'pl': {
        Categories: "Kategorie",
        Vendors: "Dostawcy",
        "Pending only": "Tylko oczekujące",
        "Add new item": "Dodawania nowego elementu",
        Item: "Przedmiot",
        Category: "Kategoria",
        Vendor: "Dostawca",
        ItemMsg: "Przedmiot lub przedmioty rozdzielone przecinkami.",
        InputMinLengthMsg: "Wprowadź przynajmniej 3 znaki...",
        "Confirm action": "Wymagane potwierdzenie",
        "deleteQuestionPart1": "Czy chcesz usunąć",
        "deleteQuestionPart2": "elementów oznaczonych jako",
        "deleteQuestionPart3": "wykonane",
        "Delete": "Usuń",
        "Cancel": "Anuluj",
        "OtherCategory": "Inne",
        "OtherVendor": "Inny"
    }
}

const i18n = new VueI18n({
    locale: 'pl',
    fallbackLocale: 'en',
    messages
})

export default i18n;