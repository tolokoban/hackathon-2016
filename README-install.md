# How to install

## Prerequisites

First of all you need to install this:
* A repository manager: [git](https://git-scm.com/)
* A off-browser javascript runner: [nodejs](https://nodejs.org/en/) (the LTS version)
* A Apache/PHP solution: [wamp](http://www.wampserver.com/en/) (for Windows users)
 
## Setting up your environment

You need to use the command line. On Linux it is obvious, in Windows, you can use the __Git Bash__ that comes with `git`.
Then open a terminal, go to your working forlder and type this:

```
git clone https://github.com/tolokoban/hackathon-2016.git hackathon-2016
cd hackathon-2016
npm update
```

Now, you are in the new directory that has been created:

You will find the file `package.json` in this folder. Edit it and change the following line:

```
    "output": "../../www/hackathon"
```

Replace `../../www/hackathon` with the path of the root of your Apache/PHP server. If you use _wamp_, dig into its installation folder and look for a file called `index.html`. This is the directory of `index.html` that you should use as `output` value.

## Compile the project

To start the continue compilation process, just open a terminal, go in the `hackathon-2016` directory and type:

```
npm run debug
```

Now you start working on the sources and view the result in a browser at this URL: [http://localhost/]

