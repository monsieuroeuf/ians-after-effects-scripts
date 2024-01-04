const SECTION_NAME = "com.ianhaigh.aescripts"
const FUZZY_COMPS_FILE = "fuzzyComps.txt"
const FUZZY_FILE_TO_OPEN = "fuzzyOpen.txt"


const ianlib = {
    getSectionName: function () {
        return SECTION_NAME
    },

    /** Get a path to the user's settings folder */
    getSettingsFolderPath: function (): string {
        const path = Folder.userData.fsName + "/" + this.getSectionName()

        if (!File(path).exists) {
            if (!Folder(path).create()) {
                throw new Error("Unable to create settings folder")
            }
        }
        return path
    },

    /**
     * Get a file object pointing to fuzzyOpen JSON
     */
    getFuzzyOpenFile: function (): File {
        return new File(this.getSettingsFolderPath() + "/" + FUZZY_FILE_TO_OPEN)
    },

    /**
     * Get a file object pointing to fuzzyComps JSON
     */
    getFuzzyCompsFile: function (): File {
        return new File(this.getSettingsFolderPath() + "/" + FUZZY_COMPS_FILE)
    },

    /**
     * Retrieve an AE preference. If it doesn't exist, create it with a blank value
     * @param keyName The name of the preference
     * */
    getPref: function (keyName: string) {
        // is the setting defined?
        if (!app.settings.haveSetting(this.getSectionName(), keyName)) {
            // if not, define it
            app.settings.saveSetting(this.getSectionName(), keyName, "")
        }

        return app.settings.getSetting(this.getSectionName(), keyName)
    },

    /**
     * Set an AE preference.
     * @param keyName name of the setting to change
     * @param value value of the setting
     */
    setPref: function (keyName: string, value: string) {
        app.settings.saveSetting(this.getSectionName(), keyName, value)
    }
}
