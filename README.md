##Lakewood Web Developer Meetup - Knockout Demo

This is the sample application I coded at the meetup. To get started, make sure you have `Ruby` installed on your machine. Then, from the command line just clone the repo:

```bash
    $ git clone git@github.com:brooklynDev/lakewood-meetup-knockout.git
```

You'll then need to install the dependencies using `bundler`. If you don't have `bundler` on your machine, you can install it using the following:

```bash
    $ gem install bundler
```

With `bundler` installed, from the root of the application install the dependencies:

```bash
    $ bundler
```

Finally, from the root of the application, just start the server:

```bash
    $ rackup
```

You can now navigate to `http://localhost:9393/`. 

There are two versions of the app, you can access the `jQuery` version at: `http://localhost:9393/jquery-version` and the `knockout.js` version at: `http://localhost:9393/knockout-version`.