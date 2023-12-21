import { App, PluginSettingTab, Setting } from "obsidian";
import { Task } from "../Shared/Models/Task"; // Update the import statement to use lowercase 'shared'
import ConditionalTasksPlugin from "src/main";

export class ConditionalTasksSettingTab extends PluginSettingTab {
	plugin: ConditionalTasksPlugin;

	constructor(app: App, plugin: ConditionalTasksPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		const task = new Task('', '');

        new Setting(containerEl)
            .setName("Title")
            .setDesc("Title of the Task")
            .addText((text) =>
                text
                    .setPlaceholder("Enter your text here")
                    .onChange(async (value) => {
                        task.title = value;
                    })
            );

        new Setting(containerEl)
            .setName("Description")
            .setDesc("Description of the Task")
            .addText((text) =>
                text
                    .setPlaceholder("Enter your text here")
                    .onChange(async (value) => {
                        task.description = value;
                    })
            );

        new Setting(containerEl)
            .setName('Save Task')
            .addButton(button => button
                .setButtonText('Save')
                .onClick(async () => {
                    if (task.title && task.description) {
                        this.plugin.settings.tasks.push(task);
                        await this.plugin.saveSettings();
                        this.display(); // Refresh the display
                    } else {
                        alert('Please fill in both title and description');
                    }
                }));

			this.plugin.settings.tasks.forEach((task, index) => {
				new Setting(containerEl)
					.setName(`${task.title}`)
					.setDesc(task.description)
					.setDesc(`Completed: ${task.completed}`)
					.addButton(button => button
						.setButtonText(task.completed ? 'Completed' : 'Mark as completed')
						.onClick(async () => {
							task.markAsCompleted();
							await this.plugin.saveSettings();
							this.display(); // Refresh the display
						}));
			});
	}
}