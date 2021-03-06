// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {edgeToolsProvider} from './edgeTools';
import {Setup} from './edgeDeveloperTools/setup';
import { registerCommands} from './vscommand';
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "edge-developer-tools" is now active!');
	vscode.window.createTreeView('edgeTools', {
		treeDataProvider: new edgeToolsProvider(vscode.workspace.rootPath)//vscode.workspace.rootPath)
	});
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = [
	vscode.commands.registerCommand('edgeDeveloperTools.helloWorld', (contex) => Setup.helloworld()),
	...await registerCommands(
		`./edgeDeveloperTools/IoTCLIcommands`, 
	),
	];	

	disposable.forEach((value) => context.subscriptions.push(value));
}

// this method is called when your extension is deactivated
export function deactivate() {}
