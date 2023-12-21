import { Plugin } from "obsidian";
import { ConditionalTasksSettingTab } from "./Settings/ConditionalTasksSettingTab";
import { ConditionalTasksSettings } from "./Settings/ConditionalTasksSettings";
import { DEFAULT_SETTINGS } from "./Settings/DEFAULT_SETTINGS";

export default class ConditionalTasksPlugin extends Plugin {
	settings: ConditionalTasksSettings;

	async onload() {
		await this.loadSettings();

		this.addSettingTab(new ConditionalTasksSettingTab(this.app, this));
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}