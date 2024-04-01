---
title: The Terminal
---

Most of the work we do on a day-to-day basis on a computer is through graphical user interfaces (GUIs). However, most of the time GUIs hide away the many capabilities of our computers. The Terminal is the interface into the operating system. At it's core, the terminal is just a file where you can write text and receive a response based on that text.

> [!warning] Unix & Oversimplification
>
> The concepts here are explained mainly for Unix systems (e.g. Linux, MacOS), because Windows is another story. You can use WSL on Windows to successfully use Linux for your development environment, and it's highly recommended. Lastly, some of the explanations are oversimplified, so you might want to look on the web for more in-depth information.

We call this "file" a `shell`. This `shell` is actually a process running on your computer, and each new `shell` starts a new process. You can have as many shells open as needed, they run in isolation so you can run command to navigate the file system or execute programs easily without[^1] affecting other shells.

## Processes

A shell is basically a process. You might be familiar with the Task Manager in Windows, so you can think of processes like each software program that is currently running. A process starts, and at some point it stops, either by itself or from an outside signal. The most common signal to stop a process is `SIGINT` (= interrupt), which is triggered by <kbd>Ctrl/Cmd + C</kbd>.

### Environment variables

Every operating system has a way of storing some configuration in a space called the "environment". Every new process receives a copy of this environment in the form of environment variables, a list formed like `key=value`. Additionally, you can specify additional environment variables for your process. For example, the following command adds the `NODE_ENV` variable into the executed script.

```sh
NODE_ENV=production node app.js

```
Or, you can do the same thing with 2 commands:

```sh
export NODE_ENV=production
node app.js
```
However, if you start a new shell that environment variable will no longer be available there, so you'll need to export it again. Now, that variable can be used inside your JavaScript code through the `process.env` object:

```js
const env = process.env.NODE_ENV
```

> [!tip] Print your environment!
>
> If you are using Linux/MacOS, try running `printenv` in a new terminal. You will now see all the current environment variables in your shell. Alternatively, you can run `console.log(process.env)` in your JavaScript code to do the same thing.

> [!warning] The environment is per-shell
>
> Many environment variables are automatically added by different systems in the OS, or other software or configuration that starts on boot or when you open a new shell. However, any other environment variables are ephemeral (temporary), and will only be available in the current shell/process or other processes that are a child of the current shell/process. If you open a new shell (e.g. executing `bash` in the terminal), then any environment variables you added manually will disappear. If you need some environment variables in every new shell, there are a couple of ways to do that, either by exporting them in the `.profile` or `.bashrc` (or other `*rc` files depending on your shell).

### Exit Codes

When a process stops, it always returns a so-called exit code, basically a number. 0 represents success, while any other number means that an error occured. For example, the following code will unzip a downloaded file only if the exit code was 0.

```sh
wget http://example.com/file.zip && unzip file.zip
```

## Customizing your shell

To improve your life and learn more about the underlying systems powering your operating system you can use other more smart shells. By default, most Linux distributions use `bash`. MacOS nowadays uses `zsh`. You can also use other shells such as `fish`. The choice is up to you, but we'll give you some ideas anyways.

[`zsh`](https://www.zsh.org/) is a powerful alternative shell, and you can improve it by adding extra plugins such as [`oh-my-zsh`](https://ohmyz.sh/). This will allow you to add plugins for autocompletion, custom coloring of your shell, and so much more. Other interesting add-ons you can try using are [`spaceship`](https://spaceship-prompt.sh/) or [`starship`](https://starship.rs/) (either one is fine). There are a myriad of opportunities to improve your shell experience and improve productivity.

[^1]: If another shell is doing some heavy processes that modify data on the disk, another shell could affect it. So it largely depends on the use-case. But it's a good default to think shells processes are isolated and don't communicate directly with one-another.