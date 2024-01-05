class IanLib {
    private static readonly SECTION_NAME       = "com.ianhaigh.aescripts"
    private static readonly FUZZY_COMPS_FILE   = "fuzzyComps.txt"
    private static readonly FUZZY_FILE_TO_OPEN = "fuzzyOpen.txt"


    static getSectionName() {
        return this.SECTION_NAME
    }

    // Get a path to the user's settings folder 
    static getSettingsFolderPath(): string {
        const path = Folder.userData.fsName + "/" + this.getSectionName()

        if (!File(path).exists) {
            if (!Folder(path).create()) {
                throw new Error("Unable to create settings folder")
            }
        }
        return path
    }

    // Get a file object pointing to fuzzyOpen JSON
    static getFuzzyOpenFile(): File {
        return new File(this.getSettingsFolderPath() + "/" + this.FUZZY_FILE_TO_OPEN)
    }

    // Get a file object pointing to fuzzyComps JSON
    static getFuzzyCompsFile(): File {
        return new File(this.getSettingsFolderPath() + "/" + this.FUZZY_COMPS_FILE)
    }

    // Retrieve an AE preference. If it doesn't exist, create it with a blank value
    static getPref(keyName: string) {
        // is the setting defined?
        if (!app.settings.haveSetting(this.getSectionName(), keyName)) {
            // if not, define it
            app.settings.saveSetting(this.getSectionName(), keyName, "")
        }

        return app.settings.getSetting(this.getSectionName(), keyName)
    }

    // Set an AE preference.
    static setPref(keyName: string, value: string) {
        app.settings.saveSetting(this.getSectionName(), keyName, value)
    }
}
