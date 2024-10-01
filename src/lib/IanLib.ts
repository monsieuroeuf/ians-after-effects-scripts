// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class IanLib {
    private static readonly SECTION_NAME       = "com.ianhaigh.aescripts"
    private static readonly FUZZY_COMPS_FILE   = "fuzzyComps.txt"
    private static readonly FUZZY_FILE_TO_OPEN = "fuzzyOpen.txt"


    static getSectionName() {
        return IanLib.SECTION_NAME
    }

    // Get a path to the user's settings folder 
    static getSettingsFolderPath(): string {
        // biome-ignore lint/style/useTemplate: <explanation>
        const path = Folder.userData.fsName + "/" + IanLib.getSectionName()

        if (!File(path).exists) {
            if (!Folder(path).create()) {
                throw new Error("Unable to create settings folder")
            }
        }
        return path
    }

    // Get a file object pointing to fuzzyOpen JSON
    static getFuzzyOpenFile(): File {
        // biome-ignore lint/style/useTemplate: <explanation>
        return new File(IanLib.getSettingsFolderPath() + "/" + IanLib.FUZZY_FILE_TO_OPEN)
    }

    // Get a file object pointing to fuzzyComps JSON
    static getFuzzyCompsFile(): File {
        // biome-ignore lint/style/useTemplate: <explanation>
        return new File(IanLib.getSettingsFolderPath() + "/" + IanLib.FUZZY_COMPS_FILE)
    }

    // Retrieve an AE preference. If it doesn't exist, create it with a blank value
    static getPref(keyName: string) {
        // is the setting defined?
        if (!app.settings.haveSetting(IanLib.getSectionName(), keyName)) {
            // if not, define it
            app.settings.saveSetting(IanLib.getSectionName(), keyName, "")
        }

        return app.settings.getSetting(IanLib.getSectionName(), keyName)
    }

    // Set an AE preference.
    static setPref(keyName: string, value: string) {
        app.settings.saveSetting(IanLib.getSectionName(), keyName, value)
    }
}
