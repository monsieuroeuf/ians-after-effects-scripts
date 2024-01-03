const scriptLIB = "com.ianhaigh.aescripts"
const ianlib = {
    getSectionName: function () {
        return scriptLIB
    },
    getSettingsFolder: function () {
        return Folder.userData + "/" + this.getSectionName()
    },
    getPref: function (keyName: string) {
        // is the setting defined?
        if (!app.settings.haveSetting(this.getSectionName(), keyName)) {
            // if not, define it
            app.settings.saveSetting(this.getSectionName(), keyName, "")
        }

        return app.settings.getSetting(this.getSectionName(), keyName)
    },
    setPref: function (keyName: string, value: string) {
        app.settings.saveSetting(this.getSectionName(), keyName, value)
    }
}