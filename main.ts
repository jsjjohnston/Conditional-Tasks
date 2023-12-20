import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';

interface ConditionalTasksSettings {
    mySetting: string;
}

const DEFAULT_SETTINGS: ConditionalTasksSettings = {
    mySetting: 'default'
}

export default class ConditionalTasksPlugin extends Plugin {
    settings: ConditionalTasksSettings;

    async onload() {
        await this.loadSettings();

        this.addSettingTab(new ConditionalTasksSettingTab(this.app, this));
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

class ConditionalTasksSettingTab extends PluginSettingTab {
    plugin: ConditionalTasksPlugin;

    constructor(app: App, plugin: ConditionalTasksPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const {containerEl} = this;

        containerEl.empty();

        new Setting(containerEl)
            .setName('Conditional Tasks Setting')
            .setDesc('This is a setting for the Conditional Tasks plugin')
            .addText(text => text
                .setPlaceholder('Enter your setting')
                .setValue(this.plugin.settings.mySetting)
                .onChange(async (value) => {
                    this.plugin.settings.mySetting = value;
                    await this.plugin.saveSettings();
                }));
    }
}