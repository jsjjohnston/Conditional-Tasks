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

		// Add a heading
		const heading = document.createElement("h1");
		heading.innerText = "Conditional Tasks Setting";
		containerEl.appendChild(heading);

		const task = new Task("", "");

		new Setting(containerEl)
			.setName("Task")
			.setDesc("Add A task")
			.addText((text) =>
				text.setPlaceholder("Name").onChange(async (value) => {
					task.title = value;
				})
			)
			.addText((text) =>
				text.setPlaceholder("Description").onChange(async (value) => {
					task.description = value;
				})
			)
			.addButton((button) =>
				button.setButtonText("Save").onClick(async () => {
					if (task.title && task.description) {
						this.plugin.settings.tasks.push(task);
						await this.plugin.saveSettings();
						this.display(); // Refresh the display
					} else {
						alert("Please fill in both title and description");
					}
				})
			);

		this.plugin.settings.tasks.forEach((task, index) => {
			new Setting(containerEl)
				.setName(`${task.title}`)
				.setDesc(task.description)
				.setDesc(`Completed: ${task.completed}`)
				.addButton((button) =>
					button
						.setButtonText(
							task.completed ? "Completed" : "Mark as completed"
						)
						.onClick(async () => {
							task.markAsCompleted();
							await this.plugin.saveSettings();
							this.display(); // Refresh the display
						})
				)
				.addButton((button) =>
					button.setButtonText("Delete").onClick(async () => {
                        this.plugin.settings.tasks.remove(task);
                        await this.plugin.saveSettings();
                        this.display(); 
                    })
				);
		});
	}
}
