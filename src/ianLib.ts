const SECTION_NAME = "com.ianhaigh.aescripts"
const FUZZY_COMPS_FILE = "fuzzyComps.txt"
const FUZZY_FILE_TO_OPEN = "fuzzyOpen.txt"


const ianlib = {
    getSectionName: function () {
        return SECTION_NAME
    },

    getSettingsFolderPath: function (): string {
        const path = Folder.userData.fsName + "/" + this.getSectionName()

        if (!File(path).exists) {
            if (!Folder(path).create()) {
                throw new Error("Unable to create settings folder")
            }
        }
        return path
    },

    getFuzzyOpenFile: function (): File {
        return new File(this.getSettingsFolderPath() + "/" + FUZZY_FILE_TO_OPEN)
    },

    getFuzzyCompsFile: function (): File {
        return new File(this.getSettingsFolderPath() + "/" + FUZZY_COMPS_FILE)
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
